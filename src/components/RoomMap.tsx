"use client";
import React, { useEffect } from "react";
import PositionTable from "./PositionTable";
import { useLoading } from "@/hooks/useLoading";
import { Wait } from "./Wait";

const RoomMap = ({ attendees }: { attendees: any }) => {
  const { isLoading, withLoading } = useLoading();

  useEffect(() => {
    const loadAttendees = async () => {
      await withLoading(async () => {
        // Xử lý attendees nếu cần
      });
    };
    loadAttendees();
  }, [attendees, withLoading]);

  return (
    <>
      {isLoading && <Wait message="Đang tải sơ đồ..." />}
      <div className="flex bg-gradient-to-tr   justify-center flex-col h-full w-full relative  overflow-x-auto">
        <div className="flex p-4">
          <div className="p-4  bg-dhcyan text-white w-full text-center rounded-xl font-bold">
            SÂN KHẤU
          </div>
        </div>
        <div className="py-4 h-full flex gap-2  justify-between px-4">
          <div className="bg-dhcyan text-white  py-2 flex items-center justify-center px-4 rounded-xl font-bold">
            KHÁCH MỜI
          </div>
          <div className="bg-dhcyan text-white  py-2 flex items-center justify-center px-4 rounded-xl font-bold">
            KHÁCH MỜI
          </div>
        </div>
        <div className=" h-auto py-4 flex justify-center items-center flex-col ">
          <div className=" text-center p-2 rounded-xl font-bold bg-dhcyan text-white">
            ĐẠI BIỂU KHÁCH MỜI
          </div>
        </div>
        <div className="p-2  py-4 h-full flex gap-2">
          <div className="py-2 w-full h-full ">
            <PositionTable
              attendees={attendees}
              min={58}
              max={80}
              side={"left"}
            />
          </div>
          <div className=" py-2 w-full h-full">
            <PositionTable
              attendees={attendees}
              min={27}
              max={54}
              side={"left"}
            />
          </div>
          <div className=" py-2 w-full h-full">
            <PositionTable
              attendees={attendees}
              min={1}
              max={26}
              side={"right"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomMap;
