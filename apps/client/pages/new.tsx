import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateTicket() {
  const { t, lang } = useTranslation("peppermint");

  const router = useRouter();

  const token = getCookie("session");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState<any>();
  const [engineer, setEngineer] = useState<any>();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState<any>(t("ticket_extra_details"));
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [options, setOptions] = useState<any>();
  const [users, setUsers] = useState<any>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: issue,
    onUpdate({ editor }) {
      setIssue(editor.getHTML());
    },
  });

  const fetchClients = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/all`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticket/create`, {
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
    <div className="inline-block bg-white rounded-lg px-8 py-4 text-left shadow-xl align-middle w-full ">
      <div className="flex flex-row w-full">
        <span className="text-md pb-2 font-bold text-xl">
          {t("ticket_new")}
        </span>
      </div>

      <input
        type="text"
        name="title"
        placeholder={t("ticket_details")}
        maxLength={64}
        autoComplete="off"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full pl-0 pr-0 sm:text-xl border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
      />

      <div className="">
        <input
          type="text"
          id="name"
          placeholder={t("ticket_name_here")}
          name="name"
          autoComplete="off"
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

        <div className="flex flex-row space-x-4 pb-4 mt-2 border-b mb-4">
          <Listbox value={company} onChange={setCompany}>
            {({ open }) => (
              <>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {company === undefined ? "Select a client" : company.name}
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {options !== undefined &&
                        options.map((client: any) => (
                          <Listbox.Option
                            key={client.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900",
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
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full min-w-[172px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {engineer === undefined
                        ? "Select a engineer"
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users !== undefined &&
                        users.map((user: any) => (
                          <Listbox.Option
                            key={user.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900",
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
        </div>

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

        <div className="border-t border-gray-300 ">
          <div className="mt-2 float-right">
            <button
              onClick={() => {
                createTicket();
              }}
              type="button"
              className="rounded bg-green-600 hover:bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-30"
            >
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
