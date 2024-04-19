import React, { MouseEventHandler } from "react";

const BookmarkOption = ({
  eventHandler,
  text,
  title,
  icon,
}: {
  eventHandler: MouseEventHandler<HTMLDivElement>;
  text: any;
  title: any;
  icon: any;
}) => {
  return (
    <div
      className="cursor-pointer group relative transition-all ease-in-out duration-150 flex flex-col  border shadow-sm rounded-xl hover:shadow-md  "
      onClick={eventHandler}
    >
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="group-hover:text-dhcyan font-semibold text-gray-800 ">
              {title}
            </h3>
            <p className="text-sm text-gray-400 transition-all duration-150 ease-in-out font-light ">
              {text}
            </p>
          </div>
          <div className="ps-3 ] text-4xl text-gray-600 group-hover:text-dhcyan">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkOption;
