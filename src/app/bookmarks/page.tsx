"use client";
import BookmarkOption from "@/components/BookmarkOption";
import AuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GrDashboard } from "react-icons/gr";
import { HiDocument, HiLogout, HiMenu, HiPlay, HiUser } from "react-icons/hi";
import { HiHandRaised, HiOutlineSquares2X2, HiQrCode } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";

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
          <BookmarkOption
            eventHandler={() => {
              router.push("/profile");
            }}
            title={"Thông tin cá nhân"}
            text={userProfile.fullName}
            icon={<HiUser />}
          />

          {userProfile?.role === "Admin" && (
            <>
              <BookmarkOption
                eventHandler={() => {
                  router.push("/dashboard");
                }}
                title={"Điều khiển"}
                text={"Quản lý điểm danh"}
                icon={<HiOutlineSquares2X2 />}
              />
              <BookmarkOption
                text={"Điểm danh đại biểu"}
                title={"Scan QR"}
                icon={<HiQrCode />}
                eventHandler={() => {
                  router.push("/scan-qr");
                }}
              />
              <BookmarkOption
                text={"Các đại biểu mới đến"}
                title={"Chào mừng đại biểu"}
                icon={<HiHandRaised />}
                eventHandler={() => {
                  router.push("/welcome");
                }}
              />
            </>
          )}
          {userProfile?.role != "Admin" && (
            <BookmarkOption
              title={"QR điểm danh"}
              text={"Đưa cho lễ tân FIT"}
              icon={<HiQrCode />}
              eventHandler={() => {
                router.push("/my-qr");
              }}
            />
          )}

          <BookmarkOption
            title={"Văn kiện đại hội"}
            text={"Xem văn kiện online"}
            icon={<HiDocument />}
            eventHandler={() => {
              router.push("/documents");
            }}
          />
          <BookmarkOption
            title={"Trò chơi"}
            text={"Who loves game? Everyone."}
            icon={<HiPlay />}
            eventHandler={() => {
              router.push("/game");
            }}
          />
          <BookmarkOption
            title={"Đăng xuất"}
            text={"Thoát tài khoản"}
            icon={<HiLogout />}
            eventHandler={async () => {
              await logout();
              router.push("/");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Bookmark;
