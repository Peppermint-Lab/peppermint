import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function UpdateUserModal({ user }) {
  const [open, setOpen] = useState(false);

  const [admin, setAdmin] = useState(user.isAdmin);

  const router = useRouter();

  async function updateUser() {
    await fetch(`/api/v1/auth/user/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({
        role: admin,
        id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          notifications.show({
            title: "User Updated",
            message: "User updated succesfully",
            color: "green",
            autoClose: 5000,
          });
    		} else {
          notifications.show({
            title: "Error",
            message: res.message,
            color: "red",
            autoClose: 5000,
          });
        }
    });
    // .then(() => router.reload());
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center px-4 py-1.5 border font-semibold border-gray-300 shadow-sm text-xs rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Role
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Edit User Role
                    </Dialog.Title>
                    <div className="mt-2 space-y-4">
                      <div className="">
                        <div className="space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          <span className="relative z-0 inline-flex shadow-sm rounded-md space-x-4">
                            <button
                              onClick={() => setAdmin(false)}
                              type="button"
                              className={
                                admin === false
                                  ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-500 text-sm font-medium text-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                                  : "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                              }
                            >
                              User
                            </button>
                            <button
                              onClick={() => setAdmin(true)}
                              type="button"
                              className={
                                admin === true
                                  ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-500 text-sm font-medium text-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                                  : "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                              }
                            >
                              Admin
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={async () => {
                      await updateUser();
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
