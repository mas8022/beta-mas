import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey: process.env.AI_LIARA_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages,
    });

    return NextResponse.json({
      status: 200,
      message: "پاسخ داده شد",
      data: response.choices[0].message.content,
    });
  } catch (error) {
  }
}
