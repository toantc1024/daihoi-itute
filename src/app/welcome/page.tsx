"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/hook/firebase";
import { getTimestamp } from "@/components/DataTable";
import AttendeeList from "@/components/AttendeeList";

const getLastNElement = (arr: any[], n: number) => {
  return arr.slice(Math.max(arr.length - n, 0));
};

const Welcome = () => {
  const [attendances, setAttendances] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "attendances"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let values: any = [];
      snapshot.forEach((doc) => {
        values.push(doc.data());
      });

      setAttendances(values);
    });
  }, []);

  // Scroll to bottom
  useEffect(() => {
    // Get the element by id
    console.log(attendances);
    // Scroll to the bottom
  }, [attendances]);

  return (
    <div className="h-screen flex m-4 p-24 gap-8 border-[1px] rounded-xl flex-col ">
      <div className="max-w-2xl text-center mx-auto">
        <div className=" block text-sm font-bold sm:text-4xl md:text-2xl  nowrap text-dhblue">
          <span className="bg-gradient-to-b font-extrabold from-dhblue to-dhcyan bg-clip-text text-transparent">
          ĐẠI HỘI ĐẠI BIỂU HỘI SINH VIÊN VIỆT NAM

          </span>
        </div>

        <div className="block text-sm font-extrabold sm:text-4xl md:text-2xl  bg-gradient-to-b from-dhred to-orange-400 bg-clip-text text-transparent">
          <span className="">KHOA CÔNG NGHỆ THÔNG TIN</span>
        </div>

        <div className="block text-sm font-normal uppercase sm:text-4xl md:text-2xl  text-dhblue">
          <span className="bg-gradient-to-b font-extrabold from-dhblue to-dhcyan bg-clip-text text-transparent">
            Trường Đại Học Sư Phạm Kỹ Thuật
          </span>
        </div>

        <div className="mt-3 text-sm ">
          <button className="bg-dhblue text-white text-sm font-bold py-2 px-2 rounded-xl ">
          LẦN THỨ VIII, NHIỆM KỲ 2025-2028
          </button>
        </div>
      </div>
      <div
        id="attend-list"
        className="flex flex-col justify-start overflow-auto gap-4 h-full"
      >
        <AttendeeList list={attendances} />
      </div>
    </div>
  );
};

export default Welcome;
