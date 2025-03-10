"use client";
import React from "react";

import Stats from "./Stats";

const Main = () => {
  return (
    <>
      <div className="min-h-screen  relative">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl text-center mx-auto">
            <div className=" block text-sm font-bold sm:text-4xl md:text-2xl  nowrap text-dhblue">
              <span className="bg-gradient-to-b font-extrabold from-dhblue to-dhcyan bg-clip-text text-transparent">
                ĐẠI HỘI ĐẠI BIỂU HỘI SINH VIÊN VIỆT NAM
              </span>
            </div>

            <div className="block text-sm font-extrabold sm:text-4xl md:text-2xl  bg-gradient-to-b from-dhred to-orange-400 bg-clip-text text-transparent">
              <span className="">KHOA CÔNG NGHỆ THÔNG TIN</span>
            </div>

            <div className="block text-sm font-normal uppercase sm:text-4xl md:text-2xl  text-dhblue">
              <span className="bg-gradient-to-b font-extrabold from-dhblue to-dhcyan bg-clip-text text-transparent">
                Trường Đại Học Sư Phạm Kỹ Thuật
              </span>
            </div>

            <div className="mt-3 text-sm ">
              <button className="bg-dhblue text-white text-sm font-bold py-2 px-2 rounded-xl ">
              LẦN THỨ VIII, NHIỆM KỲ 2025-2028
              </button>
            </div>
          </div>
        </div>

        <Stats />


      </div>
    </>
  );
};

export default Main;
