"use client";
import React, { useEffect } from "react";

const Frog = () => {
  return (
    <div className="fixed top-0 z-[99999] h-screen w-full">
      <div className="h-screen w-full">
        <iframe
          id={"iframe"}
          allowFullScreen={true}
          className="h-full w-full"
          width={"100%"}
          height={"100%"}
          src="./frog.html"
        ></iframe>
      </div>
    </div>
  );
};

export default Frog;
