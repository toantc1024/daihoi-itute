"use client";
import AuthStore from "@/store/authStore";
import React from "react";
import Loading from "../loading";

const Profile = () => {
  const currentUserProfile = AuthStore((state) => state.currentUserProfile);

  return currentUserProfile ? (
    <>
      {/* Contact Us */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Chào, {currentUserProfile.fullName}
            </h1>
          </div>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          {/* Card */}
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 dark:border-neutral-700">
            <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Thông tin đại biểu
            </h2>
            <form>
              <div className="grid gap-4 lg:gap-6">
                {/* Grid */}
                <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="hs-firstname-contacts-1"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Tên
                    </label>
                    <input
                      value={currentUserProfile.fullName}
                      type="text"
                      name="hs-firstname-contacts-1"
                      id="hs-firstname-contacts-1"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="hs-firstname-contacts-1"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      value={currentUserProfile.email}
                      type="text"
                      name="hs-firstname-contacts-1"
                      id="hs-firstname-contacts-1"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="hs-firstname-contacts-1"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Mã số đại biểu
                  </label>
                  <input
                    value={currentUserProfile.representativeID || 0}
                    type="text"
                    name="hs-firstname-contacts-1"
                    id="hs-firstname-contacts-1"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              {/* End Grid */}
            </form>
          </div>
          {/* End Card */}
        </div>
      </div>
      {/* End Contact Us */}
    </>
  ) : (
    <Loading />
  );
};

export default Profile;
