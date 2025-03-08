"use client";
import { app, db } from "@/hook/firebase";
import AuthStore from "@/store/authStore";
import { User } from "@/types/user/userProfile.type";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import QR_DH from "@/assets/background/qr_DH.jpg";

const MyQR = () => {
  const currentUser = AuthStore((state) => state.currentUser);
  const currentUserProfile = AuthStore((state) => state.currentUserProfile);
  const [isAttended, setIsAttended] = useState(false);

  const getLastName = (name: any) => {
    let arr = name.split(" ");
    if (arr.length == 1) {
      return arr[0];
    } else {
      return arr[arr.length - 1];
    }
  };

  useEffect(() => {
    if (currentUser) {
      const q = doc(db, "attendances", currentUser.uid);
      const unsubscribe = onSnapshot(q, (doc) => {
        if (doc.exists()) {
          setIsAttended(true);
          let audioEle: HTMLAudioElement | any =
            document.getElementById("success");
          audioEle.pause();
          audioEle.play();
        } else {
          setIsAttended(false);
        }
      });
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex-col flex items-center pt-14 justify-start gap-4">
      <audio src="./audio.mp3" id="success"></audio>

      <div className="text-center">
        {isAttended ? (
          <div className="text-sm  flex items-center justify-center px-4">
            <div className="py-2 p-2 border-[1px] rounded-xl ">
              <div className="max-w-2xl text-center mx-auto">
                <div className=" block text-sm font-bold sm:text-4xl md:text-2xl  nowrap text-dhblue">
                  <span className="bg-gradient-to-b font-extrabold from-dhblue to-dhcyan bg-clip-text text-transparent">
                    Chào mừng đồng chí {currentUserProfile?.fullName} đến với
                  </span>
                </div>
                <div className=" block text-sm font-bold sm:text-4xl md:text-2xl  nowrap text-dhblue">
                  <span className=" bg-gradient-to-b from-dhred to-orange-400 bg-clip-text text-transparent font-extrabold">
                  ĐẠI HỘI ĐẠI BIỂU HỘI SINH VIÊN VIỆT NAM
                  </span>
                </div>

                <div className="block text-sm font-extrabold sm:text-4xl md:text-2xl  bg-gradient-to-b from-dhred to-orange-400 bg-clip-text text-transparent">
                  <span className="">KHOA CÔNG NGHỆ THÔNG TIN</span>
                </div>

                <div className="mt-3 text-sm ">
                  <button className="bg-dhblue text-white text-sm font-bold py-2 px-2 rounded-xl">
                  LẦN THỨ VIII, NHIỆM KỲ 2025-2028
                  </button>
                </div>
              </div>
              <h3 className="">
                Số ghế của đồng chí là:{" "}
                <span className="text-dhred">
                  {currentUserProfile?.representativeID}
                </span>
              </h3>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="font-bold">Đại biểu điểm danh bằng QR</h3>
            </div>
            <h3 className="font-bold text-blue-500">Chưa điểm danh</h3>
            <div className="p-4 border-[1px] rounded-xl">
              {currentUser != null && (
                <QRCode
                  size={256}
                  logoWidth={80}
                  logoHeight={80}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={currentUser?.uid as string | ""}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyQR;
