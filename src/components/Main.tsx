"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";
import { doc, setDoc } from "firebase/firestore";
import { createPresentator, db } from "@/hook/firebase";
import { getSchoolEmail } from "@/app/utils/email_template";
import { DEFAULT_PASSWORD } from "@/constants";
import Image from "next/image";
import DH_CHU from "@/assets/background/IP.jpg";
import Partners from "./Partners";
import Stats from "./Stats";
const Main = () => {
  return (
    <>
      <div className="min-h-screen  relative">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl text-center mx-auto">
            <div className=" block text-sm font-bold sm:text-4xl md:text-2xl  nowrap text-dhblue">
              <span>ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH</span>
            </div>

            <div className="block text-sm font-bold sm:text-4xl md:text-2xl  text-dhred">
              <span>KHOA CÔNG NGHỆ THÔNG TIN</span>
            </div>

            <div className="block text-sm font-normal uppercase sm:text-4xl md:text-2xl  text-dhblue">
              <span>Trường Đại Học Sư Phạm Kỹ Thuật</span>
            </div>

            <div className="mt-3 text-sm dark:text-neutral-400">
              <button className="bg-dhblue text-white text-sm font-bold py-2 px-2 rounded-xl ">
                LẦN THỨ XI, NHIỆM KỲ 2024 - 2027
              </button>
            </div>
          </div>
        </div>

        <Stats />

        <Partners />
      </div>
    </>
  );
};

export default Main;
