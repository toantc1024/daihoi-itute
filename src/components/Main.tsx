"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";
import { doc, setDoc } from "firebase/firestore";
import { createPresentator, db } from "@/config/firebase";
import { getSchoolEmail } from "@/app/utils/email_template";
import { DEFAULT_PASSWORD } from "@/constants";
const Main = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default Main;
