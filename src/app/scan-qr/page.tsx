"use client";
import React, { useEffect, useRef, useState } from "react";
import "./QR.css";
import QrFrame from "./frame.svg";
import QRScanner from "qr-scanner";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, getUserProfileByID } from "@/hook/firebase";
import AuthStore from "@/store/authStore";
import Unauthorized from "@/components/Unauthorized";
import { Wait } from "@/components/Wait";

const ScanQR = () => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const scanner = useRef<QRScanner>();
  const [qrOn, setQrOn] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [qrData, setQrData] = useState<string | null>(null);

  const currentUserProfile = AuthStore((state) => state.currentUserProfile);
  const [currentAttendance, setCurrentAttendance] = useState<any>(null);
  const checkAttendance = async (uid: any) => {
    setShowModal(false);
    try {
      if (uid) {
        setIsLoading(true);
        const user = await getUserProfileByID(uid);
        if (user) {
          const docRef = doc(db, "attendances", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCurrentAttendance({ name: docSnap.data().fullName });
          } else {
            let attendee = {
              uid: uid,
              representativeID: user.representativeID,
              name: user.fullName,
              timestamp: new Date().toISOString(),
            };
            await setDoc(docRef, attendee);
            setCurrentAttendance(attendee);
          }
        } else {
          setCurrentAttendance({ name: "Không tìm thấy đại biểu" });
        }
        setIsLoading(false);
      }
    } catch (error) {
      setQrData(null);
    }
  };
  useEffect(() => {
    checkAttendance(qrData);
  }, [qrData]);

  const onScanSuccess = async (result: QRScanner.ScanResult) => {
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
      scanner.current = new QRScanner(videoEl?.current, onScanSuccess, {
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
  }, [currentUserProfile]);

  const [studentIdMap, setStudentIdMap] = useState<any>({});
  useEffect(() => {
    // get all users from firestore
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let map: any = {};
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let studentID: string = data.studentID;
        map[studentID] = doc.id;
        // doc.data() is never undefined for query doc snapshots
      });
      setStudentIdMap(map);
    };
    fetchUsers();
  }, [currentUserProfile]);

  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState<string>("");

  useEffect(() => {
    // Set time out and clear
    const timer = setTimeout(() => {
      setCurrentAttendance(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentAttendance]);

  return currentUserProfile && currentUserProfile.role === "Admin" ? (
    <div>
      <div className="qr-reader relative">
        {currentAttendance && (
          <div className="z-[999]  absolute w-full h-full">
            <div className="h-full flex flex-col bg-[rgba(255,255,255,.2)] border shadow-sm  ">
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
            <Wait />
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
      <div
        className={`${
          !showModal ? "hidden" : ""
        } fixed top-0 bottom-0  left-0 right-0  p-2 bg-white flex `}
      >
        <div className=" flex items-center justify-center flex-col shadow-xl gap-4 z-[999] w-full">
          <div className="max-w-sm space-y-3">
            <input
              type="text"
              onChange={(e) => setStudentId(e.target.value)}
              value={studentId}
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   "
              placeholder="MSSV"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={async () => {
                //  get user id from student id
                let uid = studentIdMap[studentId];

                checkAttendance(uid);
                setStudentId("");
              }}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Điểm danh{" "}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-dhred text-white hover:bg-dhred disabled:opacity-50 disabled:pointer-events-none"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
      <div className="p-8">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Nhập MSSV
        </button>
      </div>
    </div>
  ) : (
    <Unauthorized />
  );
};

export default ScanQR;
