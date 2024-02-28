import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from '@tiptap/extension-placeholder';
// import TextAlign from '@tiptap/extension-text-align';
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { notifications } from "@mantine/notifications";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateTicketModal() {
  const { t, lang } = useTranslation("peppermint");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState();
  const [engineer, setEngineer] = useState();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState();

  const cancelButtonRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Placeholder.configure({ placeholder: t("ticket_extra_details") })
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: issue,
    onUpdate({ editor }) {
      setIssue(editor.getHTML());
    },
  });

  const fetchClients = async () => {
    await fetch(`/api/v1/clients/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setUsers(res.users);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function createTicket() {
    await fetch("/api/v1/ticket/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        title,
        company,
        email,
        detail: issue,
        priority,
        engineer,
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

  useEffect(() => {
    fetchClients();
    fetchUsers();
  }, []);

  return (
    <div>
      <>
        <button
          onClick={() => setOpen(true)}
          id="ticket_create"
          type="button"
          className="group flex items-center w-full rounded-md p-2 text-sm leading-6 font-semibold  hover:bg-green-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white mr-3 flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span className="text-white whitespace-nowrap">
            {t("create_ticket")}
          </span>
          <div className="flex w-full justify-end float-right">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
              c
            </span>
          </div>
        </button>
      </>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
              <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 align-middle md:max-w-6xl w-full ">
                <div className="flex flex-row w-full">
                  <span className="text-md pb-2 font-bold text-xl">
                    {t("ticket_new")}
                  </span>

                  <button
                    type="button"
                    className="ml-auto mb-1.5 bg-white text-xs rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    {/* <XIcon className="h-4 w-4" aria-hidden="true" /> */}
                  </button>
                </div>

                <input
                  type="text"
                  name="title"
                  placeholder={t("ticket_details")}
                  maxLength={64}
                  autocomplete="off"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-0 pr-0 sm:text-xl border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                />

                <div className="">
                  <input
                    type="text"
                    id="name"
                    placeholder={t("ticket_name_here")}
                    name="name"
                    autocomplete="off"
                    onChange={(e) => setName(e.target.value)}
                    className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                  />

                  <input
                    type="text"
                    name="email"
                    placeholder={t("ticket_email_here")}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
                  />

                  <RichTextEditor editor={editor}>
                    <RichTextEditor.Toolbar>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                      </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content style={{ minHeight: 320 }} />
                  </RichTextEditor>

                  <div className="flex flex-row space-x-4 pb-2 mt-2">
                    <Listbox value={company} onChange={setCompany}>
                      {({ open }) => (
                        <>
                          <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full min-w-[164px] border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm">
                              <span className="block truncate">
                                {company
                                  ? company.name
                                  : t("ticket_select_client")}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                {/* <SelectorIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                /> */}
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute bottom-6 2xl:top-0 z-30 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {options !== undefined &&
                                  options.map((person) => (
                                    <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "text-gray-900 bg-gray-100"
                                            : "text-gray-900",
                                          "cursor-default select-none relative py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={person}
                                    >
                                      {({ company, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              company
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>

                                          {company ? (
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
                          <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative min-w-[164px] w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ">
                              <span className="block truncate">
                                {engineer
                                  ? engineer.name
                                  : "Select an Engineer"}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                {/* <SelectorIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                /> */}
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute bottom-6 2xl:top-0 z-30 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Listbox.Option
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-gray-900 bg-gray-100"
                                        : "text-gray-900",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={{
                                    name: "Unassigned",
                                  }}
                                >
                                  {({ company, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          company
                                            ? "font-semibold"
                                            : "font-normal",
                                          "block truncate"
                                        )}
                                      >
                                        Unassigned
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                                {users !== undefined &&
                                  users.map((team) => (
                                    <Listbox.Option
                                      key={team.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "text-gray-900 bg-gray-100"
                                            : "text-gray-900",
                                          "cursor-default select-none relative py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={team}
                                    >
                                      {({ engineer, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              engineer
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {team.name}
                                          </span>

                                          {engineer ? (
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
    </div>
  );
}
