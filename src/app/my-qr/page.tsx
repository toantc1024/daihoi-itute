"use client";
import { db } from "@/config/firebase";
import AuthStore from "@/store/authStore";
import { User } from "@/types/user/userProfile.type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

const MyQR = () => {
  const currentUser: any | null = AuthStore(
    (state) => (state as any).currentUser
  );
  // listen to currenUserProfile update
  const [isAttended, setIsAttended] = useState<boolean>(false);
  useEffect(() => {
    // Listen to the user's attendance status
    if (currentUser) {
      const unsub = onSnapshot(
        doc(db, "attendances", currentUser.uid),
        (doc) => {
          alert(doc.exists());
          setIsAttended(doc.exists());
        }
      );
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex-col flex items-center pt-14 justify-start gap-4">
      <div>
        <h3 className="font-bold">Đại biểu điểm danh bằng QR</h3>
      </div>
      <div>
        {isAttended ? (
          <h3 className="font-bold text-green-500">Đã điểm danh</h3>
        ) : (
          <h3 className="font-bold text-blue-500">Chưa điểm danh</h3>
        )}
      </div>
      <div className="p-4 border-[1px] rounded-xl">
        {currentUser != null && (
          <QRCode
            size={256}
            logoWidth={64}
            logoHeight={64}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={currentUser?.uid as string | ""}
            logoImage="https://inuvdp.com/wp-content/uploads/2022/05/logo-doan-thanh-nien-03.jpg"
          />
        )}
      </div>
    </div>
  );
};

export default MyQR;
