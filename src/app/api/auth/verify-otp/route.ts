import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { code, phone }: { code: string; phone: string } = await req.json();

    const savedCode = await prisma.otp.findFirst({
      where: {
        phone,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!savedCode) {
      return NextResponse.json(
        { message: "کد تأیید نامعتبر است", status: 401 },
        { status: 401 }
      );
    }

    await prisma.otp.deleteMany({ where: { phone } });

    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      const count = await prisma.user.count();
      user = await prisma.user.create({
        data: {
          phone,
          role: count === 0 ? "ADMIN" : "USER",
        },
      });
    }

    const sessionId = randomUUID();

    const refreshToken = signRefreshToken({
      id: user.id,
      role: user.role,
      sessionId,
    });

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
    });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        sessionId,
        refreshToken,
        expiresAt,
      },
    });

    const response = NextResponse.json({
      status: 200,
      message: "ورود با موفقیت انجام شد",
    });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15,
      path: "/",
    });

    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "خطا در تأیید کد" },
      { status: 500 }
    );
  }
}
