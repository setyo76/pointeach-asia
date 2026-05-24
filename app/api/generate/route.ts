import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: 'Route AI Gemini placeholder',
    input: body,
  });
}
