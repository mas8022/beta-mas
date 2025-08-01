import { NextRequest, NextResponse } from "next/server";
import { getAllTasks } from "@/lib/task-service";
import { prisma } from "@/lib/prisma";
import { getMe } from "@/lib/user-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, date, priority, done } = body;

    const rawCookies = req.headers.get("cookie") || "";

    const me = await getMe(rawCookies);
    if (!me) {
      return NextResponse.json(
        { status: 401, message: "لطفاً وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    await prisma.task.create({
      data: {
        title,
        description,
        date,
        priority,
        done,
        userId: me.id,
      },
    });

    return NextResponse.json({ status: 201, message: "با موفقیت ایجاد شد" });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const rawCookies = req.headers.get("cookie") || "";

    const result = await getAllTasks(rawCookies);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
