import React, { useState } from "react";
import Profile from "../components/settings/Profile";
import { Link, useHistory } from "react-router-dom";
import { Button, Divider, Input, Form, message } from "antd";

import Password from '../components/settings/Password'

const Settings = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [showProfile, setShowProfile ] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const success = () => {
    message.success("Information updated!");
  };

  const fail = () => {
    message.error("Information failed to update");
  };

  async function postData() {
    await fetch(`/api/v1/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name ? name : user.name,
        email: email ? email : user.email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.fail === false) {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(res.user));
          success();
        } else {
          fail();
        }
      });
  }

  return (
    <div>
      <main className="relative -mt-20">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav>
                  <Link
                    onClick={
                        () => {
                            setShowProfile(true)
                            setShowPassword(false)
                        }
                    }
                    className="bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                    aria-current="page"
                  >
                    <svg
                      className="text-teal-500 group-hover:text-teal-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="truncate">Profile</span>
                  </Link>

                  <Link
                    onClick={() => {
                        setShowProfile(false)
                        setShowPassword(true)
                    }}
                    className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                  >
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    <span className="truncate">Password</span>
                  </Link>
                </nav>
              </aside>
              <div
                className="divide-y divide-gray-200 lg:col-span-9" >
                <div
                className={`${showProfile ? '' : 'hidden'}`}
                >
                 <Profile />
                </div>
                <div
                className={`${showPassword ? '' : 'hidden'}`}
                >
                 <Password />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
