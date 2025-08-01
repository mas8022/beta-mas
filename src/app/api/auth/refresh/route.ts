import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshToken } from "../../../../lib/auth-service";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value;
    const session_id = cookieStore.get("session_id")?.value;

    const { status, message, newAccessToken } = await refreshToken({
      access_token,
      session_id,
    });

    const response = NextResponse.json({ status, message, newAccessToken });

    if (newAccessToken) {
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
