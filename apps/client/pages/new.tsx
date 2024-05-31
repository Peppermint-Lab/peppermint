import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect, useState } from "react";
// import TextAlign from '@tiptap/extension-text-align';
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useUser } from "../store/session";

function classNames(...classes: any) {
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

export default function CreateTicket() {
  const { t, lang } = useTranslation("peppermint");

  const router = useRouter();

  const token = getCookie("session");

  const { user } = useUser()

  const [name, setName] = useState("");
  const [company, setCompany] = useState<any>();
  const [engineer, setEngineer] = useState<any>();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState<any>("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [options, setOptions] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [selected, setSelected] = useState<any>(type[2]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Placeholder.configure({ placeholder: t("ticket_extra_details") }),
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
          email: user.email
        }
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
          router.push("/tickets");
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
    <div className="h-full bg-white dark:bg-[#0A090C]">
      <div className="w-full border-b-[1px] p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4">
          <Listbox value={company} onChange={setCompany}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white dark:bg-[#0A090C] dark:text-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {company === undefined
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
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {client.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
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
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {user.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
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
                    <span className="block truncate">{selected.name}</span>
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
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
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
        <div>
          <button
            type="button"
            onClick={() => createTicket()}
            className="rounded bg-green-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Create Ticket
          </button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row h-full w-full">
        <div className="w-full xl:w-2/3 order-2 xl:order-2">
          <div className="px-4 border-b border-gray-700">
            <input
              type="text"
              name="title"
              placeholder={t("ticket_details")}
              maxLength={64}
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-0 pr-0 sm:text-xl border-none dark:bg-[#0A090C] dark:text-white focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
            />
          </div>
          <RichTextEditor
            editor={editor}
            placeholder={t("ticket_extra_details")}
            className="dark:bg-gray-900 dark:text-white rounded-none border-none"
          >
            <RichTextEditor.Toolbar className="rounded-none dark:bg-[#0A090C]">
              <RichTextEditor.ControlsGroup className="dark:text-white">
                <RichTextEditor.Bold className="dark:text-white" />
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

            <RichTextEditor.Content className="dark:bg-[#0A090C] dark:text-white min-h-[50vh] rounded-none" />
          </RichTextEditor>
        </div>
        <div className="w-full xl:w-1/6 p-3 flex flex-col dark:bg-[#0A090C] dark:text-white  border-b-[1px] xl:border-b-0 xl:border-r-[1px] order-1 xl:order-1">
          <div className="flex flex-col">
            <div>
              <label>
                <span className="block text-sm font-medium text-gray-700 dark:text-white">
                  Contact Name
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder={t("ticket_name_here")}
                name="name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none dark:bg-[#0A090C] dark:text-white focus:shadow-none focus:ring-0 focus:border-none"
              />
            </div>

            <div>
              <label>
                <span className="block text-sm font-medium text-gray-700 dark:text-white">
                  Contact Email
                </span>
              </label>
              <input
                type="text"
                name="email"
                placeholder={t("ticket_email_here")}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none dark:bg-[#0A090C] dark:text-white focus:shadow-none focus:ring-0 focus:border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
