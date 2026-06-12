import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@isolavitale/config';
import { z } from 'zod';

const pageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(),
  published: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = pageSchema.parse(await request.json());
    
    // Create page
    const page = await prisma.page.create({
      data: body,
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
