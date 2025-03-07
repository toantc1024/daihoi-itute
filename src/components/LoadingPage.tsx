import React from "react";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-16 animate-spin">
            <div className="absolute size-full rounded-full border-4 border-gray-200"></div>
            <div className="absolute size-full rounded-full border-4 border-dhblue border-t-transparent animate-spin"></div>
          </div>
        </div>
        <div className="text-xl font-medium text-gray-600">
          Đang tải dữ liệu...
        </div>
        <div className="text-sm text-gray-400">
          Vui lòng đợi trong giây lát
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 