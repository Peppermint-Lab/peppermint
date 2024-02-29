import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function UserProfile() {
  const { data: session } = useSession();

  const router = useRouter();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [language, setLanguage] = useState();

  function changeLanguage(locale) {
    setLanguage(locale);
    router.push(router.pathname, router.asPath, {
      locale,
    });
  }

  async function updateProfile() {
    await fetch("/api/v1/users/profile/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session.user.id,
        name: name ? name : session.user.name,
        email: email ? email : session.user.email,
        language: language ? language : session.user.language,
      }),
    });
  }

  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h2>
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
            <div>
              <label
                for="language"
                className="block text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={router.locale}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="de">DE</option>
                  <option value="en">EN</option>
                  <option value="se">SE</option>
                  <option value="it">IT</option>
                  <option value="he">HE</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          onClick={async () => {
            await updateProfile();
            router.reload();
          }}
          type="submit"
          className="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
        >
          Save & Reload
        </button>
      </div>
    </>
  );
}