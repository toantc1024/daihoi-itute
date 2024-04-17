import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrelineScript from "../components/PrelineScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import DAIHOI from "@/assets/background/daihoixi.jpg";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
      <PrelineScript />
    </html>
  );
}
