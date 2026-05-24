import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  return NextResponse.json({
    message: 'Google OAuth callback placeholder',
    searchParams: Object.fromEntries(url.searchParams),
  });
}
