import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200">
      {/* ========== FOOTER ========== */}
      <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Grid */}
        <div className="text-center">
          <div>
            <button
              className="flex-none text-xl bg-dhblue shadow-sm text-white rounded-xl  px-2 py-1  dark:text-white font-bold"
              aria-label="Brand"
            >
              FITUTE
            </button>
          </div>
          {/* End Col */}
          <div className="mt-3">
            <p className="text-dhblue dark:text-neutral-500">
              Developed with love <span className="text-dhred">❤</span> by
              toantc
            </p>
          </div>
          {/* Social Brands */}
          <div className="mt-3 space-x-2">
            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              href="https://www.facebook.com/DoanHoiITUTE/"
            >
              <FaFacebook />
            </a>

            <a
              className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              href="https://github.com/toantc1024/"
            >
              <FaGithub />
            </a>
          </div>
          {/* End Social Brands */}
        </div>
        {/* End Grid */}
      </div>
      {/* ========== END FOOTER ========== */}
    </footer>
  );
};

export default Footer;
