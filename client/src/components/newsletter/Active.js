import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Open = (props) => {
  console.log(props);

  return <div></div>;
};

const Active = () => {
  const [news, setNews] = useState([]);
  const [read, setRead] = useState(false);

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
      <div class="flow-root mt-6">
        {news ? (
          news.map((annoucment) => {
            return (
              <div>
              <ul class="-my-5 divide-y divide-gray-200" key={annoucment._id}>
                <li class="py-5">
                  <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                    <h3 class="text-sm font-semibold text-gray-800">
                      <Link
                        onClick={() => setRead(true)}
                        class="hover:underline focus:outline-none"
                      >
                        {annoucment.title}
                      </Link>
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                      {annoucment.text}
                    </p>
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
      <div class="mt-6">
        <Link
          href="#"
          class="hidden w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default Active;
