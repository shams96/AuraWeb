import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/stripe';
import { prisma } from '@chiarel/config';
import { z } from 'zod';

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().min(1),
  })),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = checkoutSchema.parse(await request.json());
    
    // Validate cart items
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: session.user.id,
        },
        productId: {
          in: body.items.map(item => item.productId),
        },
      },
      include: {
        product: {
          include: {
            variants: true,
          },
        },
      },
    });

    // Check if all items exist in cart
    const cartItemIds = cartItems.map(item => item.productId);
    const requestedItemIds = body.items.map(item => item.productId);
    
    const missingItems = requestedItemIds.filter(id => !cartItemIds.includes(id));
    if (missingItems.length > 0) {
      return NextResponse.json(
        { error: 'Some items not found in cart' },
        { status: 400 }
      );
    }

    // Create checkout session
    const checkoutSession = await createCheckoutSession(body.items, session.user.id);

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
