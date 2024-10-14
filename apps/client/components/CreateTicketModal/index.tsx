import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import { notifications } from "@mantine/notifications";
import {
  ChevronUpDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useUser } from "../../store/session";
import { getCookie } from "cookies-next";

import dynamic from "next/dynamic";
import { ListPlus } from "lucide-react";

const Editor = dynamic(() => import("../BlockEditor"), { ssr: false });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const type = [
  { id: 5, name: "Incident" },
  { id: 1, name: "Service" },
  { id: 2, name: "Feature" },
  { id: 3, name: "Bug" },
  { id: 4, name: "Maintenance" },
  { id: 6, name: "Access" },
  { id: 8, name: "Feedback" },
];

export default function CreateTicketModal({ keypress, setKeyPressDown }) {
  const { t, lang } = useTranslation("peppermint");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const token = getCookie("session");

  const { user } = useUser();

  const [name, setName] = useState("");
  const [company, setCompany] = useState<any>();
  const [engineer, setEngineer] = useState<any>();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState<any>("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [options, setOptions] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [selected, setSelected] = useState<any>(type[3]);

  const fetchClients = async () => {
    await fetch(`/api/v1/clients/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setOptions(res.clients);
        }
      });
  };

  async function fetchUsers() {
    try {
      await fetch(`/api/v1/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            // TODO: THINK ABOUT AUTO ASSIGN PREFERENCES
            // setEngineer(user)
            setUsers(res.users);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function createTicket() {
    await fetch(`/api/v1/ticket/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        title,
        company,
        email,
        detail: issue,
        priority,
        engineer,
        type: selected.name,
        createdBy: {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          notifications.show({
            title: "Ticket Created",
            message: "Ticket created succesfully",
            color: "green",
            autoClose: 5000,
          });
          router.push("/issues");
        } else {
          notifications.show({
            title: "Error",
            message: `Error: ${res.error}`,
            color: "red",
            autoClose: 5000,
          });
        }
      });
  }

  function checkPress() {
    if (keypress) {
      setOpen(true);
      setKeyPressDown(false);
    }
  }

  useEffect(() => {
    fetchClients();
    fetchUsers();
  }, []);

  useEffect(() => checkPress(), [keypress]);

  return (
    <>
      <li className="w-[calc(100%+15px)]">
        <button
          onClick={() => setOpen(true)}
          className={classNames(
            location.pathname.includes("/admin")
              ? "bg-secondary dark:bg-primary"
              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
            "group -mx-2 w-full flex gap-x-3 p-1 rounded-md text-xs font-semibold leading-6"
          )}
        >
          <ListPlus className="h-4 w-4 ml-1 shrink-0 mt-1" aria-hidden="true" />
          <span className="whitespace-nowrap">New Issue</span>
          <div className="flex w-full justify-end float-right">
            <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
              c
            </span>
          </div>
        </button>
      </li>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0" onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen align-middle pt-4 mx-4 md:mx-12 text-center -mt-[50%] sm:-mt-0 sm:block sm:p-0">
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block bg-background rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 align-middle md:max-w-3xl w-full ">
                <div className="flex flex-row w-full align-middle">
                  <span className="text-md pb-2 font-semibold text-sm">
                    New Issue
                  </span>

                  <button
                    type="button"
                    className="ml-auto mb-1.5 text-foreground font-bold text-xs rounded-md hover:text-primary outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Issue title"
                  maxLength={64}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-0 pr-0 text-md text-foreground bg-background border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                />

                <div className="">
                  <input
                    type="text"
                    id="name"
                    placeholder={t("ticket_name_here")}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className=" w-full pl-0 pr-0text-foreground bg-background  sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                  />

                  <input
                    type="text"
                    name="email"
                    placeholder={t("ticket_email_here")}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" w-full pl-0 pr-0 text-foreground bg-background   sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                  />

                  <Editor setIssue={setIssue} />

                  <div className="flex flex-row space-x-4 pb-2 mt-2">
                    <Listbox value={company} onChange={setCompany}>
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <span className="block truncate">
                                {company === undefined
                                  ? t("select_a_client")
                                  : company === ""
                                  ? t("select_a_client")
                                  : company.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10  max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Listbox.Option
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-900 dark:text-white",
                                      "relative cursor-default select-none py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={undefined}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "block truncate"
                                        )}
                                      >
                                        Unassigned
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                                {options !== undefined &&
                                  options.map((client: any) => (
                                    <Listbox.Option
                                      key={client.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-900 dark:text-white",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={client}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {client.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                    <Listbox value={engineer} onChange={setEngineer}>
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <span className="block truncate">
                                {engineer === undefined
                                  ? t("select_an_engineer")
                                  : engineer.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Listbox.Option
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-900 dark:text-white",
                                      "relative cursor-default select-none py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={undefined}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "block truncate"
                                        )}
                                      >
                                        Unassigned
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                                {users !== undefined &&
                                  users.map((user: any) => (
                                    <Listbox.Option
                                      key={user.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-900 dark:text-white",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={user}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {user.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                              <span className="block truncate">
                                {selected.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {type.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-gray-400 text-white"
                                          : "text-gray-900 dark:text-white",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {person.name}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>

                  <div className="border-t border-gray-300 ">
                    <div className="mt-2 float-right">
                      <button
                        onClick={() => {
                          setOpen(false);
                          createTicket();
                        }}
                        type="button"
                        className="inline-flex justify-center rounded-md shadow-sm px-2.5 py-1.5 border border-transparent text-xs bg-green-600 font-medium text-white hover:bg-green-700 focus:outline-none "
                      >
                        Create Ticket
                      </button>
                    </div>
                  </div>

                  {/* <div className="flex justify-center mx-auto">
                        <Radio.Group
                          buttonStyle="solid"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="mx-auto justify-center space-x-4"
                        >
                          <Radio.Button value="Low">Low</Radio.Button>
                          <Radio.Button value="Normal">Normal</Radio.Button>
                          <Radio.Button value="High" className="bg-red">
                            High
                          </Radio.Button>
                        </Radio.Group>
                      </div> */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
