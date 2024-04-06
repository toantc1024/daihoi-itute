"use client";
import { auth, getUserProfileByID } from "@/hook/firebase";
import AuthStore from "@/store/authStore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiDocument, HiLogout, HiUser } from "react-icons/hi";
import { HiQrCode } from "react-icons/hi2";

const Bookmark = () => {
  const logout = AuthStore((state) => state.logout);
  const currentUser = AuthStore((state) => state.currentUser);
  const userProfile = AuthStore((state) => state.currentUserProfile);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <div className="h-screen relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {userProfile && (
        <div className="grid sm:grid-cols-2  gap-3 sm:gap-6">
          <a
            className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    {userProfile.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">Thông tin cá nhân</p>
                </div>
                <div className="ps-3">
                  <HiUser />
                </div>
              </div>
            </div>
          </a>
          {userProfile?.role === "admin" && (
            <>
              <div
                className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                <div className="p-4 md:p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                        Điều khiển
                      </h3>
                      <p className="text-sm text-gray-500">Quản lý điểm danh</p>
                    </div>
                    <div className="ps-3">
                      <HiQrCode />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                onClick={() => {
                  router.push("/scan-qr");
                }}
              >
                <div className="p-4 md:p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                        Scan QR
                      </h3>
                      <p className="text-sm text-gray-500">
                        Điểm danh đại biểu
                      </p>
                    </div>
                    <div className="ps-3">
                      <HiQrCode />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {userProfile?.role != "admin" && (
            <div
              className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
              onClick={() => {
                router.push("/my-qr");
              }}
            >
              <div className="p-4 md:p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      QR điểm danh
                    </h3>
                    <p className="text-sm text-gray-500">Đưa cho lễ tân FIT</p>
                  </div>
                  <div className="ps-3">
                    <HiQrCode />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Card */}
          {/* Card */}
          <a
            className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Văn kiện đại hội
                  </h3>
                  <p className="text-sm text-gray-500">
                    Danh sách các văn kiện
                  </p>
                </div>
                <div className="ps-3">
                  <HiDocument />
                </div>
              </div>
            </div>
          </a>
          {/* Card */}
          <div
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
          >
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Đăng xuất
                  </h3>
                </div>
                <div className="ps-3">
                  <HiLogout />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmark;
