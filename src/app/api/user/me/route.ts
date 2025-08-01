import { NextRequest, NextResponse } from 'next/server';
import { getMe } from '@/lib/user-service';

export async function GET(req: NextRequest) {
  const rawCookies = req.headers.get('cookie') || '';
  const me = await getMe(rawCookies);

  if (!me) {
    return NextResponse.json(
      { status: 401, message: 'احراز هویت انجام نشد' },
      { status: 401 }
    );
  }

  return NextResponse.json({ status: 200, message: 'کاربر پیدا شد', data: me });
}
