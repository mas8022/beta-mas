import { prisma } from "@/lib/prisma.ts";
import questions from "../../../../staticData";

export async function GET() {
  try {
    await prisma.question.createMany({ data: questions });
  } catch (error) {}
}
