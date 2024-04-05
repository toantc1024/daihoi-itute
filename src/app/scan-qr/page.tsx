"use client";
import React, { useEffect, useRef, useState } from "react";
import "./QR.css";
import QrFrame from "./frame.svg";
import QrScanner from "qr-scanner";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref } from "firebase/database";
import { db, getUserProfileByID } from "@/config/firebase";
import { Loader } from "@/components/Loader";

const QRScanner = () => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const scanner = useRef<QrScanner>();
  const [qrOn, setQrOn] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [qrData, setQrData] = useState<string | null>(null);

  const checkAttendance = async (representID: string) => {
    try {
      setIsLoading(true);

      // Business
      let profile = await getUserProfileByID(representID);
      //  add dataa to attendance collection
      //  add data to attendance collection
      await setDoc(doc(db, "attendances", representID), {
        attendedAt: new Date().toISOString(),
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    await checkAttendance(result.data);
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

  return (
    <div>
      <div className="qr-reader p-4 relative">
        {/* QR */}
        {isLoading && (
          <div className="z-[999] absolute w-full h-full">
            <Loader />
          </div>
        )}

        <video ref={videoEl}></video>
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
          if (result) {
            checkAttendance(result);
          }
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
