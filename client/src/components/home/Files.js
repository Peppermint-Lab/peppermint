import React from "react";
import { Link } from "react-router-dom";

const Files = () => {
  return (
    <div>
      <div class="flow-root mt-6">
        <ul class="-my-5 divide-y divide-gray-200">
          <li class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  Leonard Krasner
                </p>
                <p class="text-sm text-gray-500 truncate">@leonardkrasner</p>
              </div>
              <div>
                <Link
                  href="#"
                  class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                >
                  View
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-6">
        <Link
          href="#"
          class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default Files;
