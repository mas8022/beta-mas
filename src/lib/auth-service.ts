import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "./jwt";
import { prisma } from "@/lib/prisma";

type TokenPayload = {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
};

export async function refreshToken(cookies: {
  access_token?: string;
  session_id?: string;
}) {
  try {
    const { access_token, session_id } = cookies;

    try {
      verifyAccessToken(access_token || "");
      return { status: 200, message: "توکن معتبر است" };
    } catch {}

    if (!session_id) {
      return { status: 403, message: "لطفاً وارد حساب شوید" };
    }

    const rawRefresh = await prisma.refreshToken.findFirst({
      where: { sessionId: session_id },
    });

    if (!rawRefresh) {
      return { status: 403, message: "لطفاً وارد حساب شوید" };
    }

    try {
      const payload = verifyRefreshToken(
        rawRefresh.refreshToken
      ) as TokenPayload;

      const newAccessToken = signAccessToken({
        id: payload.id,
        role: payload.role,
      });

      return {
        status: 200,
        message: "توکن جدید با موفقیت ایجاد شد",
        newAccessToken,
      };
    } catch {
      return {
        status: 403,
        message: "توکن نامعتبر است. لطفاً دوباره وارد شوید",
      };
    }
  } catch {
    return {
      status: 500,
      message: "اینترنت خود را بررسی کنید",
    };
  }
}
