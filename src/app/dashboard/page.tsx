"use client";
import { db } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [attendees, setAttendees] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let userList: any = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        userList.push(doc.data());
      });

      setUsers(userList);
    })();
    const q = query(collection(db, "attendances"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let attendeeList: any = [];
      querySnapshot.forEach((doc) => {
        attendeeList.push(doc.data());
      });
      setAttendees(attendeeList);
    });
  }, []);

  return (
    <div className="p-16 grid grid-cols-3  grid-rows-2 grid-flow-col gap-4 h-screen">
      <div className="row-span-2 col-span-2">
        <>
          {/* Card */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-4 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="p-4 min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="bg-blue-600 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            F4
                          </td>
                          <td className="bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800"></td>
                          <td className="bg-blue-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            F5
                          </td>
                          <td className="bg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800"></td>
                          <td className="bg-blue-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            F6
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className=" col-span-1 ...">
        <div className="group  flex-col h-full  border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] text-white text-4xl flex items-center justify-center font-bold bg-blue-600">
          {attendees && <span>{attendees.length} đại biểu đã đến</span>}
        </div>
      </div>
      <div className="col-span-1 ...">
        <div className="group flex flex-col h-full border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] bg-red-600 items-center justify-center text-white font-bold text-4xl text-center">
          Chào mừng đại biểu
          <br />
          Trần Văn An
          <br /> vừa đến đại hội
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
