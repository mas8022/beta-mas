import { NextRequest, NextResponse } from "next/server";
import { editTask } from "@/lib/task-service";
import { prisma } from "@/lib/prisma";

// DELETE method
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { status: 400, message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({
      status: 201,
      message: "با موفقیت حذف شد",
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}

// PATCH method
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { status: 400, message: "شناسه معتبر نیست" },
        { status: 400 }
      );
    }

    const task = await prisma.task.findUnique({
      where: { id },
      select: { done: true },
    });

    if (!task) {
      return NextResponse.json(
        { status: 404, message: "تسک پیدا نشد" },
        { status: 404 }
      );
    }

    await prisma.task.update({
      where: { id },
      data: {
        done: !task.done,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "با موفقیت وضعیت انجام‌آن تغییر کرد",
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    const body = await req.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { status: 400, message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    const result = await editTask(body, id);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "اینترنت خود را بررسی کنید" },
      { status: 500 }
    );
  }
}
