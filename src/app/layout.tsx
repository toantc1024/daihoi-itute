import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import PrelineScript from "../components/PrelineScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import DAIHOI from "@/assets/background/set.png";
import LocationTracker from "../components/LocationTracker";
import { LocationProvider } from '@/contexts/LocationContext';

const fontFamily = localFont({
  src: [
    { path: "../assets/fonts/SVN-Gotham XLight.otf", weight: "100" },
    { path: "../assets/fonts/SVN-Gotham Bold.otf", weight: "400" },
    { path: "../assets/fonts/SVN-Gotham Bold.otf", weight: "700" },
    { path: "../assets/fonts/SVN-Gotham Ultra.otf", weight: "900" },
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  openGraph: {
    title: "FITUTE - Ứng dụng Đại Hội trực tuyến",
    description:
    
      "Đại hội đại biểu hội sinh viên Việt Nam - Khoa Công nghệ thông tin - Trường Đại học Sư phạm Kỹ thuật",
    url: "https://yfit.vercel.app",
    siteName: "FITUTE",
    images: [
      {
        url: DAIHOI.src,
        width: 800,
        height: 600,
      },
      {
        url: DAIHOI.src,
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  keywords: [
    "FITUTE",
    "Trường Đại học Sư phạm kỹ thuật",
    "Khoa Công nghệ thông tin",
    "Đại hội",
    "Đoàn TNCS Hồ Chí Minh",
    "Điểm danh trực tuyến FIT",
    "Tuổi trẻ UTE",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <LocationProvider>
          <Navbar />
          {children}
          <Footer />
          <LocationTracker />
        </LocationProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
