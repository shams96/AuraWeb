import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@isolavitale/config';
import { z } from 'zod';

const cartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [], total: 0 });
    }

    // Calculate totals
    const items = cart.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      product: item.product,
      variant: item.product.variants.find((v) => v.id === item.variantId),
      subtotal: item.product.price.toNumber() * item.quantity,
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return NextResponse.json({
      items,
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, variantId, quantity } = cartItemSchema.parse(body);

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: true,
      },
    });

    if (!product || product.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Product not found or inactive' },
        { status: 404 }
      );
    }

    // Check if variant exists if provided
    if (variantId) {
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) {
        return NextResponse.json(
          { error: 'Variant not found' },
          { status: 404 }
        );
      }
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    // Check if item already exists in cart
    const existingItem = variantId ? await prisma.cartItem.findUnique({
      where: {
        cartId_productId_variantId: {
          cartId: cart.id,
          productId,
          variantId,
        },
      },
    }) : null;

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: {
            include: {
              variants: true,
            },
          },
        },
      });

      return NextResponse.json(updatedItem, { status: 200 });
    } else {
      // Add new item
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId ?? '',
          quantity,
        },
        include: {
          product: {
            include: {
              variants: true,
            },
          },
        },
      });

      return NextResponse.json(newItem, { status: 201 });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}
