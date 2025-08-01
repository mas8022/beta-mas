"use client";
import React from "react";

const page = () => {
  const addHandler = () => {
    fetch("/api/add");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        onClick={addHandler}
        className="px-4 py-1.5 rounded-lg bg-blue-500 text-xl text-white"
      >
        ADD
      </button>
    </div>
  );
};

export default page;
