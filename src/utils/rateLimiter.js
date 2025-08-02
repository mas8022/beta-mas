import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60s"),
});

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "anonymous";
}

async function rateLimiter(req) {
  try {
    const ip = getClientIp(req);

    const result = await ratelimit.limit(ip);

    if (!result.success) {
      return NextResponse.json({
        status: 429,
        message: "زیادی تلاش کردی، بعداً دوباره امتحان کن",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "خطا در محدودسازی درخواست",
    });
  }
}

export default rateLimiter;
