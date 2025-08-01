import { prisma } from "./prisma";
import { getMe } from "./user-service";

export async function editTask(
  {
    title,
    description,
    date,
    priority,
    done,
  }: {
    title: string;
    description: string;
    date: string;
    priority: any;
    done: boolean;
  },
  id: number
) {
  try {
    await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        date,
        priority,
        done,
      },
    });

    return { status: 201, message: "با موفقیت ویرایش شد" };
  } catch (error) {
    return { status: 500, message: "اینترنت خود را بررسی کنید" };
  }
}

export async function getAllTasks(rawCookies: string) {
  try {
    const me = await getMe(rawCookies);

    if (!me) {
      return { status: 401, message: "احراز هویت انجام نشد" };
    }

    const tasks = await prisma.task.findMany({
      where: { userId: me.id },
    });

    return {
      status: 200,
      message: "get all user tasks",
      data: tasks,
    };
  } catch (error) {
    return { status: 500, message: "اینترنت خود را بررسی کنید" };
  }
}
