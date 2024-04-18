import React from "react";
import LOGO_NAVBAR from "@/assets/background/LOGO.png";
import Image from "next/image";

const Partners = () => {
  return (
    <>
      {/* Clients */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="w-2/3 sm:w-1/2 lg:w-1/3 mx-auto text-center mb-6">
          <h2 className="text-gray-600 dark:text-neutral-400">
            Đơn vị đồng hành
          </h2>
        </div>
        {/* End Title */}
        <div className="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
          <Image
            src={LOGO_NAVBAR.src}
            alt="logo"
            width={100}
            height={100}
            // blur data
            placeholder="blur"
            blurDataURL={LOGO_NAVBAR.blurDataURL}
          />
        </div>
      </div>
      {/* End Clients */}
    </>
  );
};

export default Partners;
