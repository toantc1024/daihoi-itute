import React, { useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";

const Hero = () => {
  return (
    <>
      {/* Hero */}
      <div className=" relative overflow-hidden">
        <div className=" max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2  bg-white border border-gray-200 text-[.8rem] text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Xem văn kiện Đại hội
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-sm md:text-4xl lg:text-6xl dark:text-gray-200">
              <span>
                Đại hội Đại biểu
                <br />
                Đoàn TNCS Hồ Chí Minh
              </span>
              <br />
              <span className="bg-clip-text bg-gradient-to-tl from-dhred to-dhblue text-transparent">
                Khoa Công nghệ Thông tin
                <br />
                Lần thứ XI
              </span>
            </h1>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-[.8rem] text-gray-600 dark:text-gray-400">
              Nhiệm kỳ 2024 - 2027
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center"></div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
};

export default Hero;
