import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@chiarel/config';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
        variants: {
          include: {
            options: true,
          },
        },
        tags: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Update product
    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        ...body,
        category: body.categoryId
          ? {
              connect: { id: body.categoryId },
            }
          : undefined,
        tags: body.tags
          ? {
              set: body.tags.map((tag: string) => ({
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-'),
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        variants: true,
        tags: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Soft delete product by setting status to ARCHIVED
    await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        status: 'ARCHIVED',
      },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
