"use client";
import { db, getUserProfileByID, signIn } from "@/config/firebase";
import { getSchoolEmail } from "../utils/email_template";
import AuthStore from "@/store/authStore";
import { UserData } from "@/types/store/authStore.types";
import { AuthCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initScriptLoader } from "next/script";

export default function Login() {
  const login = AuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const currentUser = AuthStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <main className="flex items-center justify-center h-screen w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
        {isLoading && (
          <>
            <div className="absolute top-0 start-0 size-full bg-white/[.5] rounded-lg dark:bg-gray-800/[.4]"></div>

            <div className="z-[999] absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="z-[999] animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>
        )}

        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Đăng nhập
            </h1>
          </div>
          <div className="mt-5">
            {/* Form */}
            <form
              onSubmit={async (e) => {
                try {
                  e.preventDefault();
                  // Collect form data
                  const formData = new FormData(e.target as HTMLFormElement);
                  const data: { email: string; password: string } = {
                    email: getSchoolEmail(formData.get("studentId") as string),
                    password: formData.get("password") as string,
                  };
                  setIsLoading(true);
                  await login(data);
                  setIsLoading(false);
                  router.push("/");
                } catch (error: any) {
                  setError("MSSV hoặc mật khẩu chưa đúng!");
                  setIsLoading(false);
                }
              }}
            >
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  ></label>
                  <div className="relative">
                    <input
                      onChange={() => setError(null)}
                      placeholder="MSSV"
                      id="studentId"
                      name="studentId"
                      className=" border  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <div className="flex justify-between items-center"></div>
                  <div className="relative">
                    <input
                      onChange={() => setError(null)}
                      placeholder="Mật khẩu"
                      type="password"
                      id="password"
                      name="password"
                      className=" border  py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      aria-describedby="password-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {error && (
                    <p className=" text-xs text-red-600 mt-2">{error}</p>
                  )}{" "}
                </div>
                {/* End Form Group */}
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-default-checkbox"
                    />
                    <label
                      htmlFor="hs-default-checkbox"
                      className="text-sm text-gray-500 ms-3 dark:text-gray-400"
                    >
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                </div>
                {/* End Checkbox */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </main>
  );
}
