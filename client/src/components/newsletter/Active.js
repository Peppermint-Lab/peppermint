import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Active = () => {
  const [news, setNews] = useState([]);
  const [n, setN] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getNewsletter() {
      try {
        await fetch(`/api/v1/newsletter/get/active`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setNews(res.newsletters.slice(0, 3));
          });
      } catch (error) {
        console.log(error);
      }
    }
    getNewsletter();
  }, []);

  return (
    <div>
      <div className="flow-root mt-6">
        {news ? (
          news.map((annoucment) => {
            return (
              <div>
                <ul
                  className="-my-5 divide-y divide-gray-200"
                  key={annoucment._id}
                >
                  <li className="py-5">
                    <div className="relative ">
                      <h3 className="text-sm font-semibold text-gray-800">
                        <Link
                          onClick={() => {
                            setVisible(true);
                            console.log(annoucment);
                            setN(annoucment);
                          }}
                          className="hover:underline focus:outline-none"
                        >
                          {annoucment.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {annoucment.text}
                      </p>
                    </div>
                      <div
                        className={visible ? 'fixed z-10 inset-0 overflow-y-auto' : 'hidden'}
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                          ></div>

                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>

                          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                              <div className="mt-3 text-left sm:mt-5">
                                <h3
                                  className="text-lg leading-6 font-medium text-gray-900"
                                  id="modal-title"
                                >
                                  {n.title}
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                  {n.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                              <button
                                onClick={() => setVisible(false)}
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                              >
                                Go back to dashboard
                              </button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
      <div className="mt-6">
        <Link
          to=""
          className="hidden w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default Active;
