import { NextRequest, NextResponse } from "next/server";
import { getShuffle, setUserScore } from "../../../../lib/quiz-service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    const result = await getShuffle(category);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { score } = await req.json();
    const rawCookies = req.headers.get("cookie") || "";

    const result = await setUserScore(score, rawCookies);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
