import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value || "";

    const { id } = verifyAccessToken(access_token) as { id: number };

    await Promise.all([
      await prisma.income.deleteMany({ where: { userId: id } }),
      await prisma.expense.deleteMany({ where: { userId: id } }),
    ]);

    return NextResponse.json({ status: 200, message: "اطلاعات پاک شد" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "خطایی رخ داده است" });
  }
}
