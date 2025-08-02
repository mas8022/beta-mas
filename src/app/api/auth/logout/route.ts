import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    
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
    );
  }
}
