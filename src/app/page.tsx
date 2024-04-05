"use client";
import { useEffect } from "react";
import Main from "../components/Main";
import { createAdmin } from "./utils/add_acc_tool";

export default function Home() {
  useEffect(() => {
    // createAdmin();
  }, []);
  return (
    <div className="min-h-screen">
      <Main />
    </div>
  );
}
