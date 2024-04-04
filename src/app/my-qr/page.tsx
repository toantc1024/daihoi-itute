"use client";
import AuthStore from "@/store/authStore";
import { User } from "@/types/user/userProfile.type";
import React from "react";
import QRCode from "react-qr-code";

const page = () => {
  const currentUserProfile: User | null = AuthStore(
    (state) => state.currentUserProfile
  );

  return (
    <div className="h-screen flex-col flex items-center justify-center">
      <div>
        <h3>Đưa QR này cho lễ tân để điểm danh nhe!</h3>
      </div>
      <div className="p-8">
        {currentUserProfile && (
          <QRCode
            size={250}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={currentUserProfile?.representativeID as string | ""}
            viewBox={`0 0 256 256`}
          />
        )}
      </div>
    </div>
  );
};

export default page;
