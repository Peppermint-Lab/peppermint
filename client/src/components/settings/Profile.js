import React from "react";


const Profile = () => {
  return (
    <div>
      <div class="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 class="text-lg leading-6 font-medium text-gray-900">Profile</h2>
          <p class="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div class="mt-6 flex flex-col lg:flex-row">
          <div class="flex-grow space-y-6">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div class="mt-1 rounded-md shadow-sm flex">
                <span class="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                  workcation.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autocomplete="username"
                  class="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value="lisamarie"
                />
              </div>
            </div>

            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div class="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  class="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>

          <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
            <p class="text-sm font-medium text-gray-700" aria-hidden="true">
              Photo
            </p>
            <div class="mt-1 lg:hidden">
              <div class="flex items-center">
                <div class="ml-5 rounded-md shadow-sm">
                  <div class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                    <label
                      for="user_photo"
                      class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                    >
                      <span>Change</span>
                      <span class="sr-only"> user photo</span>
                    </label>
                    <input
                      id="user_photo"
                      name="user_photo"
                      type="file"
                      class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="hidden relative rounded-full overflow-hidden lg:block">
              <img
                class="relative rounded-full w-40 h-40"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=IVHFjGVStI&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                alt=""
              />
              <label
                for="user-photo"
                class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
              >
                <span>Change</span>
                <span class="sr-only"> user photo</span>
                <input
                  type="file"
                  id="user-photo"
                  name="user-photo"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-6">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              autocomplete="given-name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              autocomplete="family-name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-12">
            <label for="url" class="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="text"
              name="url"
              id="url"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <label
              for="company"
              class="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              autocomplete="organization"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          type="button"
          class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
