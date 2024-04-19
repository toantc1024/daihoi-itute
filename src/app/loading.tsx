import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex flex-col items-center gap-4 justify-center">
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <div className="flex  text-sm gap-4 items-center justify-center font-bold">
            Bạn chờ tí nha <div className="animate-bounce">👀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
