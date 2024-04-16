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
      <div className="text-dhblue w-full flex items-center justify-center text-4xl font-bold py-8">
        Chào các đại biểu đến với Đại Hội
      </div>

      <div
        id="attend-list"
        className="flex flex-col justify-start overflow-auto gap-4 h-full"
      >
        {attendances &&
          getLastNElement(attendances, 2).map((attendance: any) => (
            <>
              <div className="rounded-xl   flex items-center justify-center h-full flex-col gap-4">
                <h1 className="text-4xl font-bold">Đại biểu</h1>
                <p className="text-6xl font-bold bg-gradient-to-tr  from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text ">
                  {attendance.name}
                </p>
              </div>
              <hr />
            </>
          ))}
      </div>
    </div>
  );
};

export default Welcome;
