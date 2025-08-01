import { prisma } from "./prisma";
import { getMe } from "./user-service";

export async function getAnalytics(rawCookies: string) {
  const me = await getMe(rawCookies);
  if (!me) {
    return {
      status: 401,
      message: "احراز هویت انجام نشد",
    };
  }

  const totalIncomeData = await prisma.income.aggregate({
    _sum: { amount: true },
  });
  const totalIncome = Number(totalIncomeData._sum.amount || 0);

  const expensesIncomeData = await prisma.expense.aggregate({
    _sum: { amount: true },
  });
  const expensesIncome = Number(expensesIncomeData._sum.amount || 0);

  const remaining = totalIncome - expensesIncome;
  const costToIncomeRatio =
    totalIncome > 0 ? Math.round((expensesIncome / totalIncome) * 100) : 0;

  const topThreeUserExpensesRaw = await prisma.expense.groupBy({
    by: ["category"],
    where: { userId: me.id },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
    take: 3,
  });

  const topThreeUserExpenses = topThreeUserExpensesRaw.map((item) => ({
    ...item,
    _sum: { amount: Number(item._sum.amount || 0) },
  }));

  const topThreeUserIncomeRaw = await prisma.income.groupBy({
    by: ["category"],
    where: { userId: me.id },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
    take: 3,
  });

  const topThreeUserIncome = topThreeUserIncomeRaw.map((item) => ({
    ...item,
    _sum: { amount: Number(item._sum.amount || 0) },
  }));

  return {
    status: 200,
    message: "اطلاعات مالی کاربر با موفقیت ارسال شد",
    data: {
      totalIncome,
      expensesIncome,
      remaining,
      costToIncomeRatio,
      topThreeUserExpenses,
      topThreeUserIncome,
    },
  };
}

export async function createExpense(
  amount: number,
  category: string,
  rawCookies: string
) {
  const me = await getMe(rawCookies);

  if (!me) {
    return { status: 401, message: "احراز هویت انجام نشد" };
  }

  await prisma.expense.create({
    data: {
      userId: me.id,
      amount,
      category,
    },
  });

  return { status: 201, message: "هزینه ثبت شد" };
}

export async function createIncome(
  amount: number,
  category: string,
  rawCookies: string
) {
  const me = await getMe(rawCookies);

  if (!me) {
    return { status: 401, message: "احراز هویت انجام نشد" };
  }

  await prisma.income.create({
    data: {
      userId: me.id,
      amount,
      category,
    },
  });

  return { status: 201, message: "درامد ثبت شد" };
}
