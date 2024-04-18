import type { Metadata } from "next";
import localFont from "@next/font/local";

import "./globals.css";
import PrelineScript from "../components/PrelineScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import DAIHOI from "@/assets/background/daihoixi.jpg";
const fontFamily = localFont({
  src: [
    { path: "../assets/fonts/SVN-Gotham XLight.otf", weight: "100" },
    { path: "../assets/fonts/SVN-Gotham Bold.otf", weight: "400" },
    { path: "../assets/fonts/SVN-Gotham Bold.otf", weight: "700" },
    { path: "../assets/fonts/SVN-Gotham Ultra.otf", weight: "900" },
  ],
});

export const metadata: Metadata = {
  title: "FITUTE - Ứng dụng Đại Hội trực tuyến",
  metadataBase: new URL("https://yfit.vercel.app/"),

  description:
    "Đại hội đại biểu đoàn TNCS Hồ Chí Minh - Khoa Công nghệ thông tin - Trường Đại học Sư phạm Kỹ thuật",
  keywords: [
    "FITUTE",
    "Trường Đại học Sư phạm kỹ thuật",
    "Khoa Công nghệ thông tin",
    "Đại hội",
    "Đoàn TNCS Hồ Chí Minh",
    "Điểm danh trực tuyến FIT",
    "Tuổi trẻ UTE",
  ],
  openGraph: {
    images: DAIHOI.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
      <PrelineScript />
    </html>
  );
}
