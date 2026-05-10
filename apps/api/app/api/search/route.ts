import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/meilisearch';
import { z } from 'zod';

const searchQuerySchema = z.object({
  q: z.string().min(1),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchQuerySchema.parse(Object.fromEntries(searchParams));

    const limit = parseInt(query.limit || '20');
    let filters = '';

    // Build filters
    if (query.category) {
      filters += `category.id = "${query.category}"`;
    }

    if (query.tags && query.tags.length > 0) {
      if (filters) filters += ' AND ';
      filters += `tags.slug IN [${query.tags.map(tag => `"${tag}"`).join(', ')}]`;
    }

    // Perform search
    const searchResults = await searchProducts(query.q, filters || undefined, limit);

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
