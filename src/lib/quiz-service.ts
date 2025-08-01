import { prisma } from "./prisma";
import { getMe } from "./user-service";

export async function getShuffle(category: string) {
  try {
    const questions = await prisma.question.findMany({
      where: { category },
    });


    const shuffle = questions.sort(() => Math.random() - 0.5);
    const selected = shuffle.slice(0, 4);

    return {
      status: 200,
      message: "با موفقیت سوال ها تصادفی گرفته شد",
      data: selected,
    };
  } catch (error) {
    return {
      status: 500,
      message: "اینترنت خود را بررسی کنید",
    };
  }
}

export async function setUserScore(score: number, rawCookies: string) {
  try {
    const me = await getMe(rawCookies);

    if (!me) {
      return {
        status: 401,
        message: "احراز هویت انجام نشد",
      };
    }

    await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        score: {
          increment: score,
        },
      },
    });

    return {
      status: 200,
      message: "امتیاز کاربر با موفقیت ثبت شد",
    };
  } catch (error) {
    return {
      status: 500,
      message: "اینترنت خود را بررسی کنید",
    };
  }
}
