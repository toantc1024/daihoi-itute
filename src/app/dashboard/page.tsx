"use client";
import RoomMap from "@/components/RoomMap";
import { db } from "@/hook/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DataTable from "@/components/DataTable";
import { HiX } from "react-icons/hi";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import AuthStore from "@/store/authStore";
import gsap from "gsap";
import Hero from "@/components/Hero";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Dashboard = () => {
  const [attendees, setAttendees] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);

  const [timeline, setTimeline] = useState<any>(null);

  const [words, setWords] = useState<any>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowLoader(false);
        },
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  const audioRef = useRef<any>();

  useEffect(() => {
    const asyncTask = async () => {
      if (!attendees) return;
      let NUMBER_OF_ATTENDEES = 80;
      if (Object.entries(attendees).length < NUMBER_OF_ATTENDEES) {
        return;
      }
      let newWords = Object.entries(attendees).reduce(
        (acc: any, [key, value]: [string, any]) => {
          acc.push(value.name);
          return acc;
        },
        []
      );
      setWords(newWords);
      // play audio
      if (audioRef.current) {
        audioRef.current.play();
      } else {
        // Throw error
      }
      setShowLoader(true);
    };

    asyncTask();
  }, [attendees]);

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
      let attendeeList: any = {};
      querySnapshot.forEach((doc) => {
        let data: any = doc.data();
        attendeeList[data.representativeID] = data;
      });
      setAttendees(attendeeList);
    });
  }, []);
  const addZero = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="relative">
      <audio ref={audioRef} src="/intro.mp3" />
      {showLoader && (
        <div className={` ${!showLoader ? "hidden" : ""} absolute z-[999]`}>
          {showLoader ? <Loader timeline={timeline} words={words} /> : null}
        </div>
      )}
      <div className="p-8 grid grid-cols-3  grid-rows-2 grid-flow-col gap-4 h-screen">
        <div
          className={`${
            showModal ? "" : "hidden"
          } fixed top-0 left-0 right-0 bottom-0 z-[999] p-8 flex items-center justify-center bg-[rgba(0,0,0,.2)]`}
        >
          <div className="h-full flex flex-col w-full bg-white rounded-xl px-8">
            <div className="flex justify-between px-2">
              <h2 className="text-center text-2xl font-bold py-8">
                Danh sách đại biểu có mặt
              </h2>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="border-[1px] p-4 rounded-full inline-flex justify-center items-center gap-x-2 text-sm font-medium  bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <HiX />
                </button>
              </div>
            </div>

            <div className="overflow-auto overflow-x-hidden ">
              <DataTable data={attendees} />
            </div>
          </div>
        </div>
        <div className="row-span-2 col-span-2">
          <>
            {/* Card */}
            <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
              <RoomMap attendees={attendees} />
            </div>
          </>
        </div>
        <div className=" col-span-1 ...">
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
            <div className=" h-full flex flex-col  gap-4 items-center justify-center">
              <div className="font-bold text-dhblue bg-clip-text text-8xl ">
                {attendees ? addZero(Object.entries(attendees).length) : 0}
              </div>{" "}
              <div className="text-gray-600 text-4xl  text-whte font-bold">
                Đại biểu
              </div>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
              <button
                className="cursor-pointer w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Danh sách
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col bg-white border shadow-sm rounded-xl  items-center justify-center px-8">
          {attendees && (
            <Chart
              options={{
                labels: ["Đã đến", "Chưa đến"],
                colors: ["#0014C7", "#FC0F08"],
              }}
              series={[
                Object.entries(attendees).length,
                80 - Object.entries(attendees).length,
              ]}
              type="donut"
              width={450}
              height={320}
            />
          )}
          {/* <div>
          <h3 className="font-bold p-4 text-center text-2xl">
            Chào mừng các đại biểu đến Đại Hội
          </h3>
        </div>
        <div className="flex  flex-col overflow-auto gap-2 px-2 py-4">
          {attendees &&
            attendees.map(
              ({ name, timestamp }: { name: string; timestamp: string }) => (
                <div className="flex border-[1px] rounded-xl p-2 shadow-sm justify-between px-4">
                  <div className="font-bold text-xl">{name}</div>
                  <div className="">{timestamp}</div>
                </div>
              )
            )}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
