import React, { useEffect } from "react";
import { useLoading } from "@/hooks/useLoading";
import { Wait } from "./Wait";

const stringCompare = (a: string, b: string) => {
  return a.localeCompare(b);
};

const sortEntriesByKey = (data: any) => {
  return data.sort((a: any, b: any) => {
    return stringCompare(a[0], b[0]);
  });
};

export const getTimestamp = (dateTimeString: string) => {
  // Create a Date object from the string
  const date = new Date(dateTimeString);

  // Get the timestamp in milliseconds
  const timestamp = date.getTime();

  return timestamp;
};

export const convertTmeStampStringToDate = (timestamp: any) => {
  return new Date(timestamp).toLocaleString();
};

const DataTable = ({ data }: any) => {
  const { isLoading, withLoading } = useLoading();

  useEffect(() => {
    const loadData = async () => {
      await withLoading(async () => {
        // Xử lý data nếu cần
      });
    };
    loadData();
  }, [data, withLoading]);

  return (
    <>
      {isLoading && <Wait message="Đang tải dữ liệu..." />}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg shadow overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead>
                  <tr>
                    {["Tên đại biểu", "Mã số", "Thời gian đến"].map(
                      (item: any, key: number) => (
                        <th
                          key={key}
                          className="px-6 py-3 bg-gray-50  text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
                        >
                          {item}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data &&
                    Object.entries(data).map((item: any, parentKey: number) => (
                      <tr key={parentKey}>
                        {sortEntriesByKey(Object.entries(item[1])).map(
                          (x: any, childrenKey: number) => {
                            if (x[0] !== "uid") {
                              return (
                                <td
                                  key={`${parentKey}-${childrenKey}`}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {x[0] === "timestamp"
                                    ? convertTmeStampStringToDate(x[1])
                                    : x[1]}
                                </td>
                              );
                            } else {
                              return null;
                            }
                          }
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
