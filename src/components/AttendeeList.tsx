"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getTimestamp } from "./DataTable";
import { useLoading } from "@/hooks/useLoading";
import { Wait } from "./Wait";

let seq = 0;

const AttendeeList = ({ list }: any) => {
  const { isLoading, withLoading } = useLoading();

  useEffect(() => {
    let b: any = document.getElementById("attend-list")?.scrollTop;
    // Scroll b to top
    document.getElementById("attend-list")?.scrollTo(0, b);
  }, [list]);

  useEffect(() => {
    const loadList = async () => {
      await withLoading(async () => {
        // Xử lý list nếu cần
      });
    };
    loadList();
  }, [list]);

  return (
    <>
      {isLoading && <Wait message="Đang cập nhật danh sách..." />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <motion.ul
          id="attend-list"
          layout
          layoutId={"list"}
          className="flex flex-col-reverse px-2  w-full overflow-auto gap-4"
        >
          <AnimatePresence>
            {list &&
              list
                .sort(
                  (a: any, b: any) =>
                    getTimestamp(a["timestamp"]) - getTimestamp(b["timestamp"])
                )
                .map((item: any) => {
                  return (
                    <motion.li
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item}
                    >
                      <div
                        className="bg-white rounded-xl  border-[1px] text-4xl flex w-full px-2 py-4   items-center justify-between  gap-4"
                        key={item.id}
                      >
                        <span className="text-2xl">Chào mừng đại biểu</span>
                        <span className="py-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500  inline-block text-transparent bg-clip-text  font-bold">
                          {item.name}
                        </span>
                      </div>
                    </motion.li>
                  );
                })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </>
  );
};

export default AttendeeList;
