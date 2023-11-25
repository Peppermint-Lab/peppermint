import { message } from "antd";
import { useState } from "react";

import { getCookie } from "cookies-next";

export default function PasswordChange({ children }) {
  const token = getCookie("token");

  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");

  const [show, setShow] = useState("profile");

  const success = () => {
    message.success("Password updated");
  };

  const fail = (f: any) => {
    message.error(`${f}`);
  };

  const postData = async () => {
    if (check === password) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            password,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.failed === false) {
            success();
          } else {
            fail(res.message);
          }
        });
    } else {
      fail("Passwords are not the same");
    }
  };

  return (
    <div>
      <main className="relative">
        <div className="mt-4">
          <div className="m-2 space-y-4 p-4 ">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter users new password"
            />

            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setCheck(e.target.value)}
              placeholder="Confirm users password"
            />
            <button
              type="button"
              className=" mb-4 float-right w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => postData()}
            >
              Update
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
