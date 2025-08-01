import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const rawCookies: string = Array.from(cookieStore)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");

    const { session_id } = parse(rawCookies || "");

    if (!session_id) {
      return NextResponse.json(
        { status: 400, message: "شناسه نشست پیدا نشد" },
        { status: 400 }
      );
    }

    await prisma.refreshToken.deleteMany({ where: { sessionId: session_id } });

    const response = NextResponse.json({
      status: 200,
      message: "با موفقیت خارج شدید",
    });

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("session_id", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
