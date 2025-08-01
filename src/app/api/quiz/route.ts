import { NextRequest, NextResponse } from "next/server";
import { getMe } from "@/lib/user-service";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const rawCookies = req.headers.get("cookie") || "";
    const body = await req.json();
    const score: number = body.score;

    if (typeof score !== "number") {
      return NextResponse.json(
        { status: 400, message: "امتیاز نامعتبر است" },
        { status: 400 }
      );
    }

    const me = await getMe(rawCookies);

    if (!me) {
      return NextResponse.json(
        { status: 401, message: "احراز هویت انجام نشد" },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { id: me.id },
      data: {
        score: {
          increment: score,
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: "امتیاز کاربر با موفقیت ثبت شد",
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
