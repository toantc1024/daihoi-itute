"use client";
import React, { useEffect } from "react";

const makeChunk = (array: any[], elementsPerChunk: number): any[][] => {
  let result = [];
  for (let i = 0; i < array.length; i += elementsPerChunk) {
    let chunk = array.slice(i, i + elementsPerChunk);
    result.push(chunk);
  }
  return result;
};

const PositionTable = ({
  side,
  min,
  max,
  attendees,
}: {
  side: string;
  min: number;
  max: number;
  attendees: any;
}) => {
  const [range, setRange] = React.useState<Array<any> | null>(null);

  const makeRange = (min: number, max: number): Array<any> =>
    // make array with value min -> max

    Array.from({ length: max - min + 1 }, (_, i) => min + i);
  useEffect(() => {
    let newRange = makeRange(min, max);
    setRange(newRange);
    console.log(newRange);
  }, [min, max]);

  useEffect(() => {
    console.log(attendees);
  }, [attendees]);

  return (
    range && (
      <table className="w-full border-separate  border-spacing-2 border rounded-xl shadow-sm border-gray-100 ">
        {
          // Split the array into 4 elements each
          attendees &&
            range &&
            makeChunk(range, 6).map((row: any, index: number) => (
              <tr className="" key={index}>
                {row.length < 6 &&
                  side === "left" &&
                  [...new Array(4 - row.length)].map((_, index) => (
                    <td key={`pad-${index}`}></td>
                  ))}
                {row.reverse().map((x: any, index: number) => (
                  <td
                    key={index}
                    className={`p-1 ${
                      attendees && attendees[x] ? "bg-dhblue" : "bg-red-500"
                    } text-white transition-all duration-9000  rounded-xl text-center font-bold border-[1px] border-gray-200`}
                  >
                    {x}
                  </td>
                ))}
                {row.length < 6 &&
                  side === "right" &&
                  [...new Array(6 - row.length)].map((_, index) => (
                    <td key={`pad-${index}`}></td>
                  ))}
              </tr>
            ))
        }
      </table>
    )
  );
};

export default PositionTable;
