import React, { useState } from "react";
import { message } from "antd";
import { useSession } from "next-auth/react";

export default function UserProfile() {

    const { data: session } = useSession();

    console.log(session)

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
            name: name ? name : session.name,
            email: email ? email : session.email,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success === false) {
              success();
            } else {
              fail();
            }
          });
      }

    return (
        <div>
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
  
          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label
                  for="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    defaultValue={session.user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* <div>
                <label
                  for="office"
                  className="block text-sm font-medium text-gray-700"
                >
                  Office
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    type="text"
                    name="office"
                    id="office"
                    className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    defaultValue={null}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div> */}
              <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    defaultValue={session.user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
  
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            onClick={async () => {
              await postData()
            } }
            type="submit"
            className="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    )
}