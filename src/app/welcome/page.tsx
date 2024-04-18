"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/hook/firebase";

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
    const element = document.getElementById("attend-list");

    // Scroll to the bottom
  }, [attendances]);

  return (
    <div className="h-screen flex m-4 p-24 gap-8 border-[1px] rounded-xl flex-col ">
      <div className="text-dhblue w-full flex items-center justify-center text-4xl font-bold py-8 ">
        Chào mừng đại biểu
      </div>

      <div
        id="attend-list"
        className="flex flex-col justify-start overflow-auto gap-4 h-full"
      >
        {attendances &&
          attendances.map((attendance: any, key: any) => (
            <>
              {key == 0 ? (
                <>
                  <div className="h-full items-center flex gap-4 justify-between py-2 flex-grow-0">
                    <span className="text-gray-900 font-bold text-2xl ">
                      Đại biểu.
                    </span>
                    <span className="py-2 text-6xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500  inline-block text-transparent bg-clip-text  font-bold">
                      {attendance.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4 justify-between items-end py-2">
                    <span className="py-2 font-bold text-2xl text-gray-800">
                      Đại biểu.
                    </span>
                    <span className=" py-2 text-4xl font-bold">
                      {attendance.name}
                    </span>
                  </div>
                </>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Welcome;
