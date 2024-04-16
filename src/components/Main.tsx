"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";
import { doc, setDoc } from "firebase/firestore";
import { createPresentator, db } from "@/hook/firebase";
import { getSchoolEmail } from "@/app/utils/email_template";
import { DEFAULT_PASSWORD } from "@/constants";
const Main = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col  before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
      <Hero />
    </div>
  );
};

export default Main;
