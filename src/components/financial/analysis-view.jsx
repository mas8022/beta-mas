"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Trash2,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import useGetMeAnalytics from "@/hooks/fetchers/useGetMeAnalytics";
import { useState } from "react";
import secretFetch from "@/utils/fetchers/secretFetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function AnalysisView() {
  const queryClient = useQueryClient()
  const { data, isPending } = useGetMeAnalytics();
  const [isClearing, setIsClearing] = useState(false);

  const formatNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num.toLocaleString("fa-IR") : "۰";

  const clearAllFinancialData = async () => {
    setIsClearing(true);

    await secretFetch.delete("/api/financial").then((res) => {
      if (res.status > 201) {
        toast.error(res.message);
      } else {
        setIsClearing(false);
        toast.success(res.message);
        queryClient.refetchQueries(["my-financial-analytics"])
      }
    });
  };

  if (isPending || !data?.data) {
    return (
      <Card
        dir="rtl"
        className="bg-white dark:bg-black border-0 shadow-md text-gray-800 dark:text-gray-200"
      >
        <CardHeader className="border-b border-muted">
          <CardTitle className="flex items-center justify-between gap-2 text-xl">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary stroke-white" />
              تحلیل و گزارش مالی
            </div>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            بررسی کامل وضعیت مالی و عملکرد شما
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 flex justify-center items-center">
          <ClipLoader color="#3b82f6" size={50} />
        </CardContent>
      </Card>
    );
  }

  const {
    totalIncome,
    expensesIncome,
    remaining,
    costToIncomeRatio: rawRatio,
    topThreeUserExpenses,
    topThreeUserIncome,
  } = data.data;

  const costToIncomeRatio =
    totalIncome > 0
      ? Math.min(Math.round((expensesIncome / totalIncome) * 100), 100)
      : 0;
  const savingRatio = Math.max(0, 100 - costToIncomeRatio);

  // حالت بدون هیچ اطلاعات مالی
  if (totalIncome === 0 && expensesIncome === 0) {
    return (
      <Card
        dir="rtl"
        className="bg-white dark:bg-zinc-900 border-0 shadow-md text-gray-800 dark:text-gray-200"
      >
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white rounded-t-lg p-2">
          <CardTitle className="flex items-center justify-between gap-2 text-xl">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-white" />
              تحلیل و گزارش مالی
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Alert
            variant="default"
            className="bg-muted dark:bg-zinc-800 border border-border text-center"
          >
            <AlertTitle className="text-lg max-[500px]:text-sm font-semibold text-center">
              هیچ اطلاعات مالی ثبت نشده است
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground mt-1">
              لطفاً ابتدا یک درآمد یا هزینه ثبت کنید تا گزارش مالی شما نمایش
              داده شود.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      dir="rtl"
      className="bg-white dark:bg-transparent border-0 shadow-md text-gray-800 dark:text-gray-200"
    >
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-2">
        <CardTitle className="flex items-center justify-between gap-2 text-xl">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary stroke-white" />
            تحلیل و گزارش مالی
          </div>
        </CardTitle>
        <CardDescription className="text-sm text-blue-100">
          بررسی کامل وضعیت مالی و عملکرد شما
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* آمار کلی */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-lg border p-6 text-center bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">کل درآمد</p>
            <p className="text-3xl font-bold">{formatNumber(totalIncome)}</p>
            <p className="text-xs">تومان</p>
          </div>
          <div className="rounded-lg border p-6 text-center bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300">
            <TrendingDown className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">کل هزینه</p>
            <p className="text-3xl font-bold">{formatNumber(expensesIncome)}</p>
            <p className="text-xs">تومان</p>
          </div>
          <div className="rounded-lg border p-6 text-center bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
            <PieChart className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">باقی‌مانده</p>
            <p className="text-3xl font-bold">{formatNumber(remaining)}</p>
            <p className="text-xs">تومان</p>
          </div>
        </div>
        {/* نمودار درصدها */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">نرخ پس‌انداز</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {savingRatio}٪
              </span>
            </div>
            <div className="w-full bg-muted dark:bg-gray-800 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${savingRatio}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">نسبت هزینه به درآمد</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {costToIncomeRatio}٪
              </span>
            </div>
            <div className="w-full bg-muted dark:bg-gray-800 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${costToIncomeRatio}%` }}
              />
            </div>
          </div>
        </div>
        {/* بیشترین درآمد و هزینه */}
        <div className="grid md:grid-cols-2 gap-6 mb-5">
          <div className="bg-muted dark:bg-gray-900 p-4 rounded-lg border border-border">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
              بیشترین هزینه‌ها
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {topThreeUserExpenses.length === 0 ? (
                <p className="text-center">اطلاعاتی موجود نیست</p>
              ) : (
                topThreeUserExpenses.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.category}</span>
                    <span className="font-bold">
                      {formatNumber(item._sum.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-muted dark:bg-gray-900 p-4 rounded-lg border border-border">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
              بیشترین درآمدها
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {topThreeUserIncome.length === 0 ? (
                <p className="text-center">اطلاعاتی موجود نیست</p>
              ) : (
                topThreeUserIncome.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.category}</span>
                    <span className="font-bold">
                      {formatNumber(item._sum.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isClearing}
          >
            <Trash2 className="h-4 w-4 ml-1" />
            {isClearing ? "در حال پاک‌سازی..." : "پاک‌سازی داده‌ها"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-zinc-800 border dark:border-zinc-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400">
              آیا از پاک‌سازی تمام داده‌ها مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              این عملیات تمام داده‌های مالی شما (درآمدها، هزینه‌ها و تحلیل‌ها)
              را برای همیشه پاک خواهد کرد. این عمل غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={clearAllFinancialData}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              بله، پاک کن
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
