"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const PrelineScript = () => {
  const path = usePathname();

  useEffect(() => {
    // Kiểm tra xem HSStaticMethods đã tồn tại chưa
    if (typeof window !== 'undefined') {
      import('preline/preline').then(() => {
        setTimeout(() => {
          // Kiểm tra lại một lần nữa trước khi gọi
          if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
          }
        }, 100);
      });
    }
  }, [path]);

  return null;
};

export default PrelineScript;
