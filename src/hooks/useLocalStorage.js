"use client";
import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const handleSetState = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      let value;

      if (storedValue !== null) {
        value = JSON.parse(storedValue);
      } else {
        value = initialValue;
        localStorage.setItem(key, JSON.stringify(initialValue));
      }

      setState(value);
    } catch (err) {
      setState(initialValue);
    }

    setIsPending(false);
  }, [key]);

  return [state || [], handleSetState, isPending];
};
