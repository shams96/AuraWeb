import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@isolavitale/config';
import { z } from 'zod';

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  published: z.boolean().default(true),
});

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = faqSchema.parse(await request.json());
    
    // Create FAQ
    const faq = await prisma.faq.create({
      data: body,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
