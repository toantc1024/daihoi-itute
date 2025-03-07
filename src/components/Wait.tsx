import React from "react";

interface WaitProps {
  message?: string;
}

export const Wait = ({ message = "Đang xử lý" }: WaitProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex justify-center flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-lg font-medium text-gray-700">{message}</div>
        <div className="relative">
          <div className="size-10 animate-spin">
            <div className="absolute size-full rounded-full border-4 border-gray-200"></div>
            <div className="absolute size-full rounded-full border-4 border-dhblue border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
