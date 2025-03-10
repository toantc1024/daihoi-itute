"use client";
import { auth, getUserProfileByID } from "@/hook/firebase";
import AuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { HiMenu } from "react-icons/hi";

import LOGO_NAVBAR from "@/assets/background/cumLOGO.png";
import Image from "next/image";
import { Wait } from "./Wait";
import { useLoading } from "@/hooks/useLoading";

const Navbar = () => {
  const logout = AuthStore((state) => state.logout);
  const setCurrentUser = AuthStore((state) => state.setCurrentUser);
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = AuthStore((state) => state.currentUser);
  const { isLoading, withLoading } = useLoading();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let profile = await getUserProfileByID(user.uid);
        console.log(user);
        setCurrentUser(user, profile);
      } else {
        console.log("User is signed out");
      }
    });
    return subscriber;
  }, [setCurrentUser]);

  const handleNavigation = async (path: string) => {
    await withLoading(async () => {
      router.push(path);
    });
  };

  return (
    <>
      {isLoading && <Wait message="Đang chuyển trang..." />}
      <header className="top-0 sticky flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 ">
        <nav className="relative max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto  px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={LOGO_NAVBAR.src} alt="logo" width={200} height={200} />
          </div>
          <div className="flex items-center ms-auto sm:ms-0 sm:order-3 p-2">
            <div className="ps-3 sm:ps-6 sm:ms-6">
              {!currentUser ? (
                <button
                  onClick={() => handleNavigation("/login")}
                  type="button"
                  className="py-2 px-4 flex justify-center items-center text-sm font-semibold rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                >
                  Đăng nhập
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation(pathname === "/bookmarks" ? "/" : "/bookmarks")}
                  type="button"
                  className="py-2 px-2  flex justify-center items-center text-xl font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none  "
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
