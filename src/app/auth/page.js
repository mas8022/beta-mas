"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Fetch from "@/utils/fetchers/Fetch";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/navigation";

// ✅ کامپوننت سفارشی OTPInput
function CustomOTPInput({ length = 5, onChange, disabled }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }
  };

  return (
    <div dir="ltr" className="flex justify-center gap-2">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      ))}
    </div>
  );
}

// ✅ فرم اصلی
export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^09\d{9}$/;
  const otpRegex = /^\d{5}$/;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      if (step === "phone") {
        if (!phoneRegex.test(data.phone)) {
          toast.error("شماره تلفن معتبر نیست");
          setLoading(false);
          return;
        }

        setPhone(data.phone);

        const { status, message } = await Fetch.post("/api/auth/send-otp", {
          phone: data.phone,
        });

        if (status > 201) {
          toast.error(message);
          setLoading(false);
          return;
        }

        toast.success(message);
        setStep("otp");
        setTimeLeft(120);
        setCanResend(false);
      } else {
        if (!otpRegex.test(data.otp)) {
          toast.error("کد باید ۵ رقم باشد");
          setLoading(false);
          return;
        }

        const { status, message } = await Fetch.post(
          "/api/auth/verify-otp",
          {
            phone,
            code: data.otp,
          },
          { withCredentials: true }
        );

        if (status > 201) {
          toast.error(message);
          setLoading(false);
          return;
        }

        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;

    setLoading(true);
    try {
      const { status, message } = await Fetch.post("/api/auth/send-otp", {
        phone,
      });

      if (status > 201) {
        toast.error(message);
        return;
      }

      toast.success("کد دوباره ارسال شد");
      setTimeLeft(120);
      setCanResend(false);
    } catch {
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-card p-6 rounded-xl shadow-md space-y-5 text-right flex flex-col items-center"
      >
        <h2 className="text-xl font-bold mb-2 text-center">
          ورود با شماره موبایل
        </h2>

        {step === "phone" ? (
          <>
            <Input
              placeholder="شماره موبایل (مثال: 09123456789)"
              {...register("phone", { required: true })}
              dir="ltr"
              disabled={loading}
            />

            <Button
              className="w-full dark:bg-white"
              type="submit"
              disabled={loading}
            >
              {!!loading ? (
                <PropagateLoader size={10} color="#000" />
              ) : (
                "ارسال کد تایید"
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="text-sm text-muted-foreground text-center">
              کد تایید به {phone} ارسال شد
            </div>

            {/* 🔁 استفاده از OTP سفارشی */}
            <CustomOTPInput
              length={5}
              disabled={loading}
              onChange={(val) => setValue("otp", val)}
            />

            <div className="flex justify-between gap-15 text-sm text-muted-foreground w-full items-center">
              <span>{formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || loading}
                className={`${
                  !canResend ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ارسال مجدد
              </button>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              تایید کد
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
