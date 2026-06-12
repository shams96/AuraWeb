import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@isolavitale/config';
import { z } from 'zod';

const updateCartItemSchema = z.object({
  quantity: z.number().min(1),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { quantity } = updateCartItemSchema.parse(await request.json());

    // Find the cart item and verify it belongs to the user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: params.id },
      include: {
        cart: {
          include: {
            user: true,
          },
        },
        product: true,
      },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Check if product has enough stock
    if (cartItem.product.trackQuantity) {
      const totalQuantity = await prisma.cartItem.aggregate({
        where: {
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          cart: {
            userId: session.user.id,
          },
        },
        _sum: {
          quantity: true,
        },
      });

      const currentQuantity = totalQuantity._sum.quantity || 0;
      const newQuantity = currentQuantity - cartItem.quantity + quantity;

      if (newQuantity > cartItem.product.quantity) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        );
      }
    }

    // Update cart item
    const updatedItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
      include: {
        product: {
          include: {
            variants: true,
          },
        },
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find the cart item and verify it belongs to the user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: params.id },
      include: {
        cart: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
