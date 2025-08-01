import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { status: 400, message: "شماره تلفن الزامی است" },
        { status: 400 }
      );
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await axios.post(
      "http://ippanel.com/api/select",
      {
        op: "pattern",
        user: process.env.FARAZSMS_USER,
        pass: process.env.FARAZSMS_PASS,
        fromNum: process.env.FARAZSMS_FROM_NUM,
        toNum: phone,
        patternCode: process.env.FARAZSMS_PATTERN_CODE,
        inputData: [{ "verification-code": code }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await prisma.otp.create({
      data: {
        phone,
        code,
        expiresAt
      },
    });

    return NextResponse.json({ status: 200, message: "کد ارسال شد" });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "خطا در ارسال کد" },
      { status: 500 }
    );
  }
}
