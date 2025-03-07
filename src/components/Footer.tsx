import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import Image from "next/image";
import LOGO_NAVBAR from "@/assets/background/set.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Đơn vị đồng hành */}
        <div className="mb-10">
          <h2 className="text-gray-800 font-bold text-center mb-6">Đơn vị đồng hành</h2>
          <div className="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
            <Image
              src={LOGO_NAVBAR.src}
              alt="logo"
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={LOGO_NAVBAR.blurDataURL}
            />
          </div>
        </div>

        {/* Đường kẻ phân cách */}
        <div className="border-t border-gray-300 mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo và thông tin chính */}
          <div className="md:col-span-1">
            <p className="mt-4 text-gray-600">
              Đoàn - Hội Khoa Công nghệ Thông tin
              <br />
              Trường ĐH Sư phạm Kỹ thuật TP.HCM
            </p>
          </div>

          {/* Liên hệ */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-gray-800 mb-4">Liên hệ</h3>
            <p className="text-gray-600">
              Số 1 Võ Văn Ngân, P. Linh Chiểu
              <br />
              TP. Thủ Đức, TP. Hồ Chí Minh
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-gray-800 mb-4">Theo dõi chúng tôi</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                className="p-2 hover:bg-dhblue hover:text-white rounded-full transition-all duration-300 text-gray-600"
                href="https://www.facebook.com/DoanHoiITUTE/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-center text-gray-600">
            Developed with love <span className="text-dhred">❤</span> by{" "}
            <a 
              href="https://github.com/toantc1024" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-dhblue transition-colors duration-300 underline"
            >
              toantc
            </a>
            {" & "}
            <a 
              href="https://github.com/andyanh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-dhblue transition-colors duration-300 underline"
            >
              andyanh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
