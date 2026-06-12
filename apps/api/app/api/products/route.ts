import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@isolavitale/config';
import { z } from 'zod';

const productQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'newest']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = productQuerySchema.parse(Object.fromEntries(searchParams));

    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const skip = (page - 1) * limit;

    const where: any = {};

    // Filter by category if provided
    if (query.category) {
      const category = await prisma.category.findFirst({
        where: { slug: query.category },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    // Search functionality
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { shortDescription: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Filter only active products
    where.status = 'ACTIVE';

    // Sorting
    let orderBy: any = {};
    switch (query.sort) {
      case 'featured':
        orderBy.featured = 'desc';
        break;
      case 'price-asc':
        orderBy.price = 'asc';
        break;
      case 'price-desc':
        orderBy.price = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      default:
        orderBy.featured = 'desc';
        orderBy.createdAt = 'desc';
    }

    // Get products
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: true,
        variants: {
          include: {
            options: true,
          },
        },
        tags: true,
        images: true,
      },
    });

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate product data
    const productData = z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string(),
      shortDescription: z.string(),
      price: z.number().positive(),
      comparePrice: z.number().positive().optional(),
      sku: z.string().min(1),
      barcode: z.string().optional(),
      trackQuantity: z.boolean(),
      quantity: z.number().min(0),
      status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED']),
      featured: z.boolean(),
      images: z.array(z.string()).optional(),
      categoryId: z.string(),
      tags: z.array(z.string()).optional(),
    }).parse(body);

    // Create product
    const product = await prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: productData.categoryId },
        },
        tags: productData.tags
          ? {
              create: productData.tags.map((tag) => ({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
