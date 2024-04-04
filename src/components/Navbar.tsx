"use client";
import { auth, getUserProfileByID } from "@/config/firebase";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let profile = await getUserProfileByID(user.uid);
        setCurrentUser(user, profile);
      } else {
        console.log("User is signed out");
      }
    });
    return subscriber;
  }, []);
  return (
    <>
      <header className="top-0 sticky flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
        <nav className="relative max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between"
            onClick={() => {
              router.push("/");
            }}
          >
            <a className="flex-none text-xl font-semibold dark:text-white">
              Brand
            </a>
          </div>
          <div className="flex items-center ms-auto sm:ms-0 sm:order-3 p-2">
            <div className="ps-3 sm:ps-6 sm:ms-6 sm:border-s sm:border-gray-300 dark:border-gray-700">
              {!currentUser ? (
                <button
                  onClick={() => router.push("/login")}
                  type="button"
                  className="py-2 px-4 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Đăng nhập
                </button>
              ) : (
                <button
                  onClick={() => router.push("/bookmarks")}
                  type="button"
                  className="py-2 px-4 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <HiMenu />
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
