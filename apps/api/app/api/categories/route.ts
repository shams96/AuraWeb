import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@chiarel/config';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: {
            product: {
              status: 'ACTIVE',
            },
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            products: {
              where: {
                product: {
                  status: 'ACTIVE',
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const categoriesWithCount = categories.map((category) => ({
      ...category,
      productCount: category._count.products,
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate category data
    const categoryData = {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description || '',
      image: body.image || null,
    };

    // Create category
    const category = await prisma.category.create({
      data: categoryData,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
