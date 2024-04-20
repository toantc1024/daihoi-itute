"use client";
import { db } from "@/hook/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiDocument } from "react-icons/hi";
import Loading from "../loading";
import { ToastContainer, toast } from "react-toastify";
import AuthStore from "@/store/authStore";

import "react-toastify/dist/ReactToastify.css";
export default function Documents() {
  const [showDocument, setShowDocument] = useState<boolean>(false);
  const [currentDocument, setCurrentDocument] = useState<string>("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [allowView, setAllowView] = useState<boolean>(false);

  useEffect(() => {
    // Fetch documents

    const fetchDocuments = async () => {
      const settingSnapshot = await getDocs(collection(db, "global_settings"));
      settingSnapshot.forEach((doc) => {
        if (doc.id === "allowView") {
          setAllowView(doc?.data()?.allowView);
        }
      });
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

  const [showAddDocument, setShowAddDocument] = useState<boolean>(false);

  const currentUserProfile = AuthStore((state) => state.currentUserProfile);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <ToastContainer />
      <>
        {/* Table Section */}
        <div className="w-full overflow-x-auto px-4 h-full py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Card */}
          <div className="flex flex-col">
            {currentUserProfile && currentUserProfile.role === "Admin" && (
              <div className="py-4 flex  gap-4 items-center justify-center">
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      checked={allowView}
                      onChange={(e) => {
                        setAllowView(e.target.checked);
                      }}
                      type="checkbox"
                      defaultValue=""
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900">
                      Cho phép xem văn kiện
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    // set allow view to firestore
                    try {
                      await setDoc(doc(db, "global_settings", "allowView"), {
                        allowView: allowView,
                      });
                      toast.success("Cập nhật thành công");
                    } catch (err) {
                      toast.error("Cập nhật thất bại");
                    }
                  }}
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Áp dụng
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setShowAddDocument(true);
                  }}
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Thêm văn kiện
                </button>
              </div>
            )}
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full h-full  inline-block align-middle">
                <div className=" border   h-full border-gray-200 rounded-xl shadow-sm  overflow-auto  max-h-[400px]  ">
                  <table className="w-full  h-full divide-y divide-gray-200  relative">
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
                      {allowView || currentUserProfile?.role === "Admin" ? (
                        documents ? (
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
                        )
                      ) : (
                        <div className="px-2">
                          <div className="font-light py-2 px-4">
                            Chưa có văn kiện
                          </div>
                        </div>
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

        <div
          className={`${
            !showAddDocument ? "hidden" : ""
          } absolute bg-gray-200 w-full h-full`}
        >
          <div className="w-full h-full z-[88]">
            <div className="p-1">
              <button
                onClick={() => {
                  setShowAddDocument(false);
                }}
                className="border-[1px] border-gray-200 w-8 h-8 rounded-full bg-white flex items-center justify-center text-2xl text-gray-500 p-2 shadow-sm"
              >
                <HiArrowLeft />
              </button>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <input
                type="text"
                className="rounded-xl py-2 px-2"
                placeholder="Link"
              />{" "}
              <button
                type="button"
                onClick={async () => {
                  setShowAddDocument(true);
                }}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
