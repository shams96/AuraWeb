import Stripe from 'stripe';
import { envSchema, prisma } from '@chiarel/config';

// Validate environment variables
const env = envSchema.parse(process.env);

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function createCheckoutSession(
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>,
  userId: string
) {
  try {
    // Get user information
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Create line items for Stripe
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: {
            variants: true,
          },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const variant = item.variantId
          ? product.variants.find((v: { id: string; price: any }) => v.id === item.variantId)
          : null;
        const price = variant?.price || product.price;

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.shortDescription,
              images: product.images,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      })
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${env.VERCEL_URL || 'http://localhost:5000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.VERCEL_URL || 'http://localhost:5000'}/cancel`,
      metadata: {
        userId: user.id,
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw error;
  }
}

export async function handleWebhook(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw new Error('Webhook signature verification failed');
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handlePaymentSuccess(session);
      break;
    case 'checkout.session.async_payment_succeeded':
      const asyncSession = event.data.object as Stripe.Checkout.Session;
      await handlePaymentSuccess(asyncSession);
      break;
    case 'checkout.session.async_payment_failed':
      const failedSession = event.data.object as Stripe.Checkout.Session;
      await handlePaymentFailure(failedSession);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
}

async function handlePaymentSuccess(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;
    if (!userId) {
      throw new Error('User ID not found in session metadata');
    }

    // Get the line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Process line items to get product details
    const orderItemsData = await Promise.all(
      lineItems.data.map(async (item) => {
        // Get product name from description or expanded product
        const productName = item.description || '';
        const product = await prisma.product.findFirst({
          where: { name: productName },
          include: { variants: true },
        });

        if (!product) {
          console.warn(`Product not found for line item: ${productName}`);
          return null;
        }

        // For now, use the base product. In a real scenario, you'd match variants
        const variant = product.variants[0] || null;
        const variantId = variant?.id || product.id;

        return {
          productId: product.id,
          variantId: variantId,
          name: product.name,
          sku: product.sku,
          price: item.amount_total ? item.amount_total / 100 / (item.quantity || 1) : 0,
          quantity: item.quantity || 1,
        };
      })
    );

    // Filter out null entries
    const validOrderItems = orderItemsData.filter((item): item is NonNullable<typeof item> => item !== null);

    if (validOrderItems.length === 0) {
      throw new Error('No valid products found for order');
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        stripeSessionId: session.id,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        total: session.amount_total ? session.amount_total / 100 : 0,
        currency: (session.currency || 'usd').toUpperCase(),
        items: {
          create: validOrderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    // Update inventory
    for (const orderItem of validOrderItems) {
      const product = await prisma.product.findUnique({
        where: { id: orderItem.productId },
      });

      if (product && product.trackQuantity) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            quantity: {
              decrement: orderItem.quantity,
            },
          },
        });
      }

      // Also update variant inventory if applicable
      const variant = await prisma.productVariant.findUnique({
        where: { id: orderItem.variantId },
      });

      if (variant && variant.trackQuantity) {
        await prisma.productVariant.update({
          where: { id: variant.id },
          data: {
            quantity: {
              decrement: orderItem.quantity,
            },
          },
        });
      }
    }

    // Send confirmation email
    await sendOrderConfirmationEmail(order);

    // Update payment status to PAID and order status to CONFIRMED
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
    });

    console.log(`Order ${order.id} created successfully`);
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handlePaymentFailure(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;
    if (!userId) {
      throw new Error('User ID not found in session metadata');
    }

    // Update order status to FAILED if it exists
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          paymentStatus: 'VOIDED',
          status: 'CANCELLED',
        },
      });
    }

    console.log(`Payment failed for session ${session.id}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}

async function sendOrderConfirmationEmail(order: any) {
  // Implementation for sending email using Resend
  // This will be implemented when we set up the email system
  console.log(`Sending confirmation email for order ${order.id}`);
}
