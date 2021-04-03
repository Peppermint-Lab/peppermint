import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const LazyMain = React.lazy(() => import("./admin/Main"));
const LazyNews = React.lazy(() => import("./admin/Newsletters"));
const LazyClient = React.lazy(() => import("./admin/Client"));
const LazyAuth = React.lazy(() => import("./admin/Auth"));

const Admin = () => {
  const [dash, setDash] = useState(true);
  const [news, setNews] = useState(false);
  const [client, setClient] = useState(false);
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <div class="h-screen flex overflow-hidden bg-gray-100">
        <div
          class="fixed inset-0 flex z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="fixed inset-0 bg-gray-600 bg-opacity-75"
            aria-hidden="true"
          ></div>
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="sr-only">Close sidebar</span>
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav class="mt-5 px-2 space-y-1">
                <Link
                  onClick={() => {
                    setDash(true);
                    setNews(false);
                    setClient(false);
                  }}
                  class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="text-gray-500 mr-4 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>

                <Link
                  onClick={() => {
                    setDash(false);
                    setNews(true);
                    setClient(false);
                    setAuth(false)
                  }}
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Newsletters
                </Link>

                <Link
                  onClick={() => {
                    setClient(true);
                    setDash(false);
                    setNews(false);
                    setAuth(false)
                  }}
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Clients
                </Link>

                <Link
                  onClick={() => {
                    setClient(false);
                    setDash(false);
                    setNews(false);
                    setAuth(true)
                  }}
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Internal Users
                </Link>
              </nav>
            </div>
          </div>

          <div class="flex-shrink-0 w-14"></div>
        </div>

        <div class="hidden md:flex md:flex-shrink-0">
          <div class="flex flex-col w-64">
            <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
                  <Link
                    onClick={() => {
                      setDash(true);
                      setNews(false);
                      setClient(false);
                      setAuth(false);
                    }}
                    class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:text-gray-900 hover:bg-gray-100"
                  >
                    <svg
                      class="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    onClick={() => {
                      setDash(false);
                      setNews(true);
                      setClient(false);
                      setAuth(false);
                    }}
                    class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    <svg
                      class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Newsletters
                  </Link>

                  <Link
                    onClick={() => {
                      setClient(true);
                      setDash(false);
                      setNews(false);
                      setAuth(false);
                    }}
                    class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    <svg
                      class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Clients
                  </Link>

                  <Link
                    onClick={() => {
                      setAuth(true);
                      setDash(false);
                      setNews(false);
                      setClient(false);
                    }}
                    class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    <svg
                      class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Internal Users
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-0 flex-1 overflow-hidden">
          <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open sidebar</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <main
            class="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabindex="0"
          >
            <div className={dash ? "" : "hidden"}>
              <Suspense
                fallback={
                  <div>
                    <Spin />
                  </div>
                }
              >
                <LazyMain />
              </Suspense>
            </div>
            <div className={news ? "" : "hidden"}>
              <Suspense
                fallback={
                  <div>
                    <Spin />
                  </div>
                }
              >
                <LazyNews />
              </Suspense>
            </div>
            <div className={client ? "" : "hidden"}>
              <Suspense
                fallback={
                  <div>
                    <Spin />
                  </div>
                }
              >
                <LazyClient />
              </Suspense>
            </div>
            <div className={auth ? "" : "hidden"}>
              <Suspense
                fallback={
                  <div>
                    <Spin />
                  </div>
                }
              >
                <LazyAuth />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
