"use client";
import React, { useEffect, useRef, useState } from "react";
import "./QR.css";
import QrFrame from "./frame.svg";
import QrScanner from "qr-scanner";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, getUserProfileByID } from "@/hook/firebase";
import { Loader } from "@/components/Loader";

const QRScanner = () => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const scanner = useRef<QrScanner>();
  const [qrOn, setQrOn] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [qrData, setQrData] = useState<string | null>(null);

  const [currentAttendance, setCurrentAttendance] = useState<any>(null);

  useEffect(() => {
    const checkAttendance = async () => {
      try {
        if (qrData) {
          setIsLoading(true);
          const user = await getUserProfileByID(qrData);
          if (user) {
            const docRef = doc(db, "attendances", qrData);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setCurrentAttendance({ name: "Đã điểm danh" });
            } else {
              let attendee = {
                uid: qrData,
                name: user.fullName,
                timestamp: new Date().toISOString(),
              };
              await setDoc(docRef, attendee);
              setCurrentAttendance(attendee);
            }
          } else {
            alert(user.uid);
            setCurrentAttendance({ name: "Không tìm thấy đại biểu" });
          }
          setIsLoading(false);
          setQrData(null);
        }
      } catch (error) {
        setQrData(null);
      }
    };
    checkAttendance();
  }, [qrData]);

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (qrData === result.data) return;
    setQrData(result.data);
    // 🖨 Print the "result" to browser console.
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };
  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Set time out and clear
    const timer = setTimeout(() => {
      setCurrentAttendance(null);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentAttendance]);

  return (
    <div>
      <div className="qr-reader relative">
        {currentAttendance && (
          <div className="z-[999]  absolute w-full h-full">
            <div className="h-full flex flex-col bg-[rgba(255,255,255,.2)] border shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex flex-auto flex-col justify-start items-center p-4 md:p-5 ">
                <span className="bg-white py-2 px-2 flex rounded-xl  w-full items-center justify-center font-bold text-blue-700">
                  {currentAttendance?.name || "Đang chờ quét QR"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* QR */}
        {isLoading && (
          <div className="z-[999] absolute w-full h-full">
            <Loader />
          </div>
        )}
        <video
          className=" shadow-md rounded-2xl relative"
          ref={videoEl}
        ></video>
        <div ref={qrBoxEl} className="qr-box z-[0]">
          <img
            src={QrFrame.src}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>
      </div>
      <button
        onClick={() => {
          let result = prompt("Nhập MSSV");
        }}
        type="button"
        className="button"
      >
        Nhập MSSV
      </button>
    </div>
  );
};

export default QRScanner;
