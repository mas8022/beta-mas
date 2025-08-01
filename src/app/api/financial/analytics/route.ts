import { NextRequest, NextResponse } from 'next/server';
import { getAnalytics } from '@/lib/financial-service';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const result = await getAnalytics(cookie);

  return NextResponse.json(result, { status: result.status });
}
