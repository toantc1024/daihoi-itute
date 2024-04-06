import React from "react";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col bg-[rgba(255,255,255,.2)] border shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center flex-col items-center gap-4 bg-white p-8 rounded-xl">
          <div className="">Đang kiểm tra</div>
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
