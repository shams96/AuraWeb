import { NextRequest, NextResponse } from 'next/server';
import { handleWebhook } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const response = await handleWebhook(request);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
