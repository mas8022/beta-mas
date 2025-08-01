import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getMe } from "../../../../lib/user-service";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const rawCookies = Object.entries(cookieStore.getAll() || {})
      .map(([key, value]) => `${key}=${value.value}`)
      .join("; ");

    const me = await getMe(rawCookies);

    if (!me) {
      return NextResponse.json(
        { status: 401, message: "کاربر یافت نشد یا وارد نشده است" },
        { status: 401 }
      );
    }

    const contacts = await prisma.contact.findMany({
      where: { userId: me.id },
    });

    return NextResponse.json({
      status: 200,
      message: "لیست مخاطبین شما با موفقیت ارسال شدن",
      data: contacts,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
