"use client";
import { use, useEffect, useReducer, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Fetch from "@/utils/fetchers/Fetch";
import secretFetch from "@/utils/fetchers/secretFetch";

const TOTAL_TIME = 25;

const initialState = {
  questions: [],
  current: 0,
  selected: null,
  timeLeft: TOTAL_TIME,
  quizEnded: false,
  score: 0,
  locked: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };
    case "SELECT_OPTION": {
      const isCorrect =
        action.payload === state.questions[state.current]?.correctAnswer;
      return {
        ...state,
        selected: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
        locked: true,
      };
    }
    case "NEXT_QUESTION": {
      const hasMore = state.current + 1 < state.questions.length;
      return {
        ...state,
        current: hasMore ? state.current + 1 : state.current,
        selected: null,
        locked: false,
        quizEnded: !hasMore,
      };
    }
    case "TICK": {
      if (state.timeLeft <= 1) {
        return { ...state, timeLeft: 0, quizEnded: true };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    }
    default:
      return state;
  }
}

const Page = ({ params }) => {
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);
  const router = useRouter();
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false); // State برای مدیریت لودر

  useEffect(() => {
    if (!state.questions.length) {
      Fetch.get(`/api/quiz/${decodedCategory}`).then((res) => {
        const shuffled = res.data.sort(() => Math.random() - 0.5).slice(0, 4);
        dispatch({ type: "SET_QUESTIONS", payload: shuffled });
      });
    }
  }, [decodedCategory, state.questions.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const setUserScore = async () => {
      if (state.quizEnded && !isSubmitting) {
        setIsSubmitting(true);
        try {
          await secretFetch.put("/api/quiz", { score: state.score });
          router.replace(`/quiz/${decodedCategory}/${state.score}`);
        } catch (error) {
          setIsSubmitting(false);
        }
      }
    };
    setUserScore();
  }, [state.quizEnded, isSubmitting]);

  if (!state.questions.length) return null;

  const currentQuestion = state.questions[state.current];
  const options = [
    currentQuestion.answerOne,
    currentQuestion.answerTwo,
    currentQuestion.answerThree,
    currentQuestion.answerFour,
  ];

  const handleSelect = (option) => {
    if (state.locked) return;
    dispatch({ type: "SELECT_OPTION", payload: option });
    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
    }, 800);
  };

  const percent = (state.timeLeft / TOTAL_TIME) * 100;
  const radius = 45;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (percent / 100);

  return (
    <div className="h-screen w-full px-4 py-6 pb-20 bg-white dark:bg-black text-gray-800 dark:text-white flex flex-col items-center justify-between overflow-hidden">
      {/* لودر مدرن هنگام ارسال امتیاز */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center"
            >
              {/* انیمیشن لودر */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                در حال ارسال امتیاز...
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 bg-primary rounded-full mt-4 overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* تایمر دایره‌ای */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-gray-300 dark:text-neutral-700"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
          {state.timeLeft}s
        </div>
      </div>

      {/* سوال */}
      <div className="w-full max-w-md text-center h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={state.current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            {currentQuestion.question}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* گزینه‌ها */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {options.map((option) => {
          const isCorrect =
            state.selected && option === currentQuestion.correctAnswer;
          const isWrong =
            state.selected &&
            option === state.selected &&
            option !== currentQuestion.correctAnswer;
          return (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!state.selected}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                state.selected
                  ? isCorrect
                    ? "bg-green-100 text-green-800 border-green-400 dark:bg-green-600/20 dark:text-green-300 dark:border-green-500"
                    : isWrong
                    ? "bg-red-100 text-red-800 border-red-400 dark:bg-red-600/20 dark:text-red-300 dark:border-red-500"
                    : "bg-gray-100 dark:bg-neutral-800"
                  : "bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Page;