"use client";
import { db } from "@/hook/firebase";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiDocument } from "react-icons/hi";
import Loading from "../loading";

export default function Documents() {
  const [showDocument, setShowDocument] = useState<boolean>(false);
  const [currentDocument, setCurrentDocument] = useState<string>("");
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch documents

    const fetchDocuments = async () => {
      // get docuemtns from firestore
      const querySnapshot = await getDocs(collection(db, "documents"));
      let docs: any = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setDocuments(docs);
    };
    fetchDocuments();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <>
        {/* Table Section */}
        <div className="w-full overflow-x-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Card */}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm  overflow-auto  max-h-[400px]  ">
                  <table className="w-full max-h-[400px] divide-y divide-gray-200  relative">
                    <thead className="sticky top-0 bg-gray-50 ">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                              Tên văn kiện
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 "></span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y overflow-y-auto max-h-[80vh] divide-gray-200 ">
                      {" "}
                      {documents ? (
                        documents.map((x: any, index: any) => {
                          return (
                            <tr
                              key={`document-${index}`}
                              onClick={() => {
                                setCurrentDocument(x.url);
                                setShowDocument(true);
                              }}
                              className="bg-white hover:bg-gray-50  "
                            >
                              <td className="size-px whitespace-nowrap">
                                <button type="button" className="block">
                                  <span className="block px-6 py-2">
                                    <span className="text-sm text-gray-600 ">
                                      {x.title}
                                    </span>
                                  </span>
                                </button>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <button
                                  type="button"
                                  className="block"
                                  data-hs-overlay="#hs-ai-invoice-modal"
                                >
                                  <span className="px-6 py-1.5">
                                    <span className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm   ">
                                      <HiDocument />
                                    </span>
                                  </span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <Loading />
                      )}
                    </tbody>
                  </table>
                  {/* End Table */}
                  {/* Footer */}
                  <div className="sticky bottom-0  bg-white px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800 ">
                          {documents && documents.length}
                        </span>{" "}
                        văn kiện
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${!showDocument ? "hidden" : ""} absolute w-full h-full`}
        >
          <div className="w-full h-full z-[88]">
            <div className="p-1">
              <button
                onClick={() => {
                  setShowDocument(false);
                }}
                className="border-[1px] border-gray-200 w-8 h-8 rounded-full bg-white flex items-center justify-center text-2xl text-gray-500 p-2 shadow-sm"
              >
                <HiArrowLeft />
              </button>
            </div>
            <iframe
              src={currentDocument}
              width="100%"
              height="90%"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </>
    </div>
  );
}
