import { NextRequest, NextResponse } from 'next/server';
import { createExpense } from '@/lib/financial-service';

export async function POST(req: NextRequest) {
  try {
    const { amount, category } = await req.json();
    const rawCookies = req.headers.get('cookie') || '';

    const result = await createExpense(amount, category, rawCookies);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: 'خطایی رخ داده است' },
      { status: 500 }
    );
  }
}
