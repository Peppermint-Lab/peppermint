import { useQuery } from "react-query";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { message, Upload, Divider } from "antd";
import moment from "moment";
import { Menu, Transition, Listbox } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  PencilSquareIcon,
  LockOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarIcon,
  CheckCircleIcon,
  LockClosedIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import renderHTML from 'react-render-html';
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import TextAlign from '@tiptap/extension-text-align';
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { notifications } from "@mantine/notifications";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Ticket() {
  const router = useRouter();

  const fetchTicketById = async () => {
    const id = router.query.id;
    const res = await fetch(`/api/v1/ticket/${id}`);
    return res.json();
  };

  const { data, status, refetch } = useQuery("fetchTickets", fetchTicketById);

  useEffect(() => {
    refetch();
  }, [router]);

  const [edit, setEdit] = useState(false);

  const [users, setUsers] = useState();
  const [n, setN] = useState();

  const [note, setNote] = useState();
  const [issue, setIssue] = useState();
  const [title, setTitle] = useState();
  const [uploaded, setUploaded] = useState();
  const [comment, setComment] = useState();
  const [assignedEdit, setAssignedEdit] = useState(false);
  const [labelEdit, setLabelEdit] = useState(false);

  const IssueEditor = useEditor({
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

  const history = useRouter();

  const { id } = history.query;

  let file = [];

  async function update() {
    await fetch(`/api/v1/ticket/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detail: issue,
        note,
        title,
        // priority,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  async function updateStatus() {
    await fetch(`/api/v1/ticket/${id}/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !data.ticket.isComplete,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }
  async function addComment() {
    await fetch(`/api/v1/ticket/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  const propsUpload = {
    name: "file",
    showUploadList: false,
    action: `/api/v1/ticket/${id}/file/upload`,
    data: () => {
      let data = new FormData();
      data.append("file", file);
      data.append("filename", file.name);
      data.append("ticket", ticket.id);
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUploaded(true);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const fetchUsers = async () => {
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
  };

  async function postData() {
    if (n !== undefined) {
      await fetch(`/api/v1/ticket/${id}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: n.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setAssignedEdit(false);
            refetch();
          }
        });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (status === "success") {
      if (IssueEditor) {
        IssueEditor.commands.setContent(data.ticket.detail);
      }
    }
  }, [data, IssueEditor]);

  return (
    <div>
      {status === "loading" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2> Loading data ... </h2>
          {/* <Spin /> */}
        </div>
      )}

      {status === "error" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold"> Error fetching data ... </h2>
          {/* <img src={server} className="h-96 w-96" alt="error" /> */}
        </div>
      )}

      {status === "success" && (
        <div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-6xl xl:grid-cols-3">
                <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
                  <div>
                    <div>
                      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">
                            {data.ticket.title}
                          </h1>
                          <p className="mt-2 text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {data.ticket.email}
                            </span>{" "}
                            via
                            <a href="#" className="font-medium text-gray-900">
                              {data.ticket.fromImap === true
                                ? " Email - "
                                : " Ticket Creation - "}
                            </a>
                            #{data.ticket.Number}
                          </p>
                        </div>
                        <div className="mt-4 flex space-x-3 md:mt-0">
                          {!edit ? (
                            <button
                              type="button"
                              onClick={() => setEdit(true)}
                              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <PencilIcon
                                className="-ml-0.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              Edit
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                update()
                                setEdit(false)
                              }}
                              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <CheckIcon
                                className="-ml-0.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                      <aside className="mt-8 xl:hidden">
                        <h2 className="sr-only">Details</h2>
                        <div className="space-y-5">
                          {!data.ticket.isComplete ? (
                            <div className="flex items-center space-x-2">
                              <LockOpenIcon
                                className="h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                              <span className="text-sm font-medium text-green-700">
                                Open Issue
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <LockClosedIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                              <span className="text-sm font-medium text-red-700">
                                Closed Issue
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <ChatBubbleLeftEllipsisIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {data.ticket.comments.length} comments
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CalendarIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              Created on{" "}
                              {moment(data.ticket.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 space-y-8 border-b border-t border-gray-200 py-6">
                          <div>
                            <div className="flex flex-row justify-between items-center">
                              <span className="text-sm font-medium text-gray-500">
                                Assignees
                              </span>
                              {!assignedEdit ? (
                                <button
                                  onClick={() => setAssignedEdit(true)}
                                  className="text-sm font-medium text-gray-500 hover:underline"
                                >
                                  edit
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    postData();
                                  }}
                                  className="text-sm font-medium text-gray-500 hover:underline"
                                >
                                  save
                                </button>
                              )}
                            </div>
                            {!assignedEdit ? (
                              <ul role="list" className="mt-3 space-y-3">
                                <li className="flex justify-start">
                                  <a
                                    href="#"
                                    className="flex items-center space-x-3"
                                  >
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                                        <span className="text-xs font-medium leading-none text-white uppercase">
                                          {data.ticket.assignedTo
                                            ? data.ticket.assignedTo.name[0]
                                            : "-"}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {data.ticket.assignedTo
                                        ? data.ticket.assignedTo.name
                                        : "-"}
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            ) : (
                              users && (
                                <Listbox
                                  value={n}
                                  onChange={setN}
                                  className="z-50"
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="mt-1 relative">
                                        <Listbox.Button className="bg-white z-50 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                          <span className="block truncate">
                                            {n
                                              ? n.name
                                              : "Please select new user"}
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
                                          <Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {users.map((user) => (
                                              <Listbox.Option
                                                key={user.id}
                                                className={({ active }) =>
                                                  classNames(
                                                    active
                                                      ? "text-white bg-indigo-600"
                                                      : "text-gray-900",
                                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                                  )
                                                }
                                                value={user}
                                              >
                                                {({ n, active }) => (
                                                  <>
                                                    <span
                                                      className={classNames(
                                                        n
                                                          ? "font-semibold"
                                                          : "font-normal",
                                                        "block truncate"
                                                      )}
                                                    >
                                                      {user.name}
                                                    </span>

                                                    {n ? (
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
                              )
                            )}
                          </div>
                          <div className="border-t border-gray-200">
                            <div className="flex flex-row items-center">
                              <span className="text-sm font-medium text-gray-500 mt-2">
                                Labels
                              </span>
                              <span className="text-sm font-medium text-gray-500 mt-2">
                                edit
                              </span>
                            </div>
                            <ul
                              role="list"
                              className="mt-2 leading-8 space-x-2"
                            >
                              {data.ticket.priority === "Low" && (
                                <li className="inline">
                                  <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <div className="absolute flex flex-shrink-0 items-center justify-center">
                                      <span
                                        className="h-1.5 w-1.5 rounded-full bg-blue-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-3 text-xs font-semibold text-gray-900">
                                      {data.ticket.priority} Priority
                                    </div>
                                  </div>
                                </li>
                              )}
                              {data.ticket.priority === "Normal" && (
                                <li className="inline">
                                  <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <div className="absolute flex flex-shrink-0 items-center justify-center">
                                      <span
                                        className="h-1.5 w-1.5 rounded-full bg-green-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-3 text-xs font-semibold text-gray-900">
                                      {data.ticket.priority} Priority
                                    </div>
                                  </div>
                                </li>
                              )}
                              {data.ticket.priority === "High" && (
                                <li className="inline">
                                  <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <div className="absolute flex flex-shrink-0 items-center justify-center">
                                      <span
                                        className="h-1.5 w-1.5 rounded-full bg-rose-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-3 text-xs font-semibold text-gray-900">
                                      {data.ticket.priority} Priority
                                    </div>
                                  </div>
                                </li>
                              )}
                              {data.ticket.status && (
                                <li className="inline">
                                  <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <div className="absolute flex flex-shrink-0 items-center justify-center">
                                      <span
                                        className="h-1.5 w-1.5 rounded-full bg-rose-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-3 text-xs font-semibold text-gray-900">
                                      {data.ticket.status ===
                                        "needs_support" && (
                                        <span>Needs Support</span>
                                      )}
                                      {data.ticket.status === "in_progress" && (
                                        <span>In Progress</span>
                                      )}
                                      {data.ticket.status === "in_review" && (
                                        <span>In Review</span>
                                      )}
                                      {data.ticket.status === "done" && (
                                        <span>Done</span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </aside>
                      <div className="py-3 xl:pb-0 xl:pt-2">
                        <span className="text-sm font-bold">Description</span>
                        <div className="prose max-w-none">
                          {edit ? (
                            <RichTextEditor editor={IssueEditor}>
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

                              <RichTextEditor.Content
                                style={{ minHeight: 320 }}
                              />
                            </RichTextEditor>
                          ) : (
                            <span className="break-words">
                              {renderHTML(data.ticket.detail)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <section
                    aria-labelledby="activity-title"
                    className="mt-8 xl:mt-10"
                  >
                    <div>
                      <div className="divide-y divide-gray-200">
                        <div className="pb-2">
                          <span
                            id="activity-title"
                            className="text-lg font-medium text-gray-900"
                          >
                            Comments
                          </span>
                        </div>
                        <div className="pt-2">
                          {/* Activity feed*/}
                          <div className="flow-root">
                            <ul role="list" className="-mb-8">
                              {data.ticket.comments.length > 0 &&
                                data.ticket.comments.map((item, itemIdx) => (
                                  <li key={item.id}>
                                    <div className="relative pb-8">
                                      {itemIdx !==
                                      data.ticket.comments.length - 1 ? (
                                        <span
                                          className="absolute left-3 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                          aria-hidden="true"
                                        />
                                      ) : null}
                                      <div className="relative flex items-start space-x-3">
                                        <div className="relative">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                                            <span className="font-medium leading-none text-xs text-white uppercase">
                                              {item.user.name[0]}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div>
                                            <div className="text-sm">
                                              <span className="font-medium text-gray-900 ">
                                                {item.user.name}
                                              </span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                              {item.public
                                                ? "Publicly"
                                                : "Internally"}{" "}
                                              commented at{" "}
                                              {moment(item.createdAt).format(
                                                "hh:mm DD-MM-YYYY"
                                              )}
                                            </p>
                                          </div>
                                          <div className="text-sm  text-gray-900">
                                            <span>{item.text}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-12">
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <div className="relative">
                                  <span className="absolute -bottom-0.5 -right-1 rounded-t px-0.5 py-px">
                                    <ChatBubbleLeftEllipsisIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div>
                                  <div>
                                    <label
                                      htmlFor="comment"
                                      className="sr-only"
                                    >
                                      Comment
                                    </label>
                                    <textarea
                                      id="comment"
                                      name="comment"
                                      rows={3}
                                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                      placeholder="Leave a comment"
                                      defaultValue={""}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mt-6 flex items-center justify-end space-x-4">
                                    {data.ticket.isComplete ? (
                                      <button
                                        type="button"
                                        onClick={() => updateStatus()}
                                        className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                      >
                                        <CheckCircleIcon
                                          className="-ml-0.5 h-5 w-5 text-red-500"
                                          aria-hidden="true"
                                        />
                                        <span className="pt-1">
                                          Re-Open issue
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => updateStatus()}
                                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                      >
                                        <CheckCircleIcon
                                          className="-ml-0.5 h-5 w-5 text-green-500"
                                          aria-hidden="true"
                                        />
                                        Close issue
                                      </button>
                                    )}
                                    <button
                                      onClick={() => addComment()}
                                      type="submit"
                                      className="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-[7px] text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <aside className="hidden xl:block xl:pl-8">
                  <h2 className="sr-only">Details</h2>
                  <div className="space-y-5">
                    {!data.ticket.isComplete ? (
                      <div className="flex items-center space-x-2">
                        <LockOpenIcon
                          className="h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-green-700">
                          Open Issue
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <LockClosedIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-red-700">
                          Closed Issue
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <ChatBubbleLeftEllipsisIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {data.ticket.comments.length} comments
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Created created on{" "}
                        {moment(data.ticket.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-8 border-t border-gray-200 py-2">
                    <div>
                      <div className="flex flex-row justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Assignees
                        </span>
                        {!assignedEdit ? (
                          <button
                            onClick={() => setAssignedEdit(true)}
                            className="text-sm font-medium text-gray-500 hover:underline"
                          >
                            edit
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              postData();
                            }}
                            className="text-sm font-medium text-gray-500 hover:underline"
                          >
                            save
                          </button>
                        )}
                      </div>
                      {!assignedEdit ? (
                        <ul role="list" className="mt-3 space-y-3">
                          <li className="flex justify-start">
                            <a href="#" className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                                  <span className="text-xs font-medium leading-none text-white uppercase">
                                    {data.ticket.assignedTo
                                      ? data.ticket.assignedTo.name[0]
                                      : "-"}
                                  </span>
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {data.ticket.assignedTo
                                  ? data.ticket.assignedTo.name
                                  : "-"}
                              </div>
                            </a>
                          </li>
                        </ul>
                      ) : (
                        users && (
                          <Listbox value={n} onChange={setN} className="z-50">
                            {({ open }) => (
                              <>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="bg-white z-50 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span className="block truncate">
                                      {n ? n.name : "Please select new user"}
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
                                    <Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {users.map((user) => (
                                        <Listbox.Option
                                          key={user.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-indigo-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={user}
                                        >
                                          {({ n, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  n
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {user.name}
                                              </span>

                                              {n ? (
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
                        )
                      )}
                    </div>
                    <div className="border-t border-gray-200">
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 mt-2">
                          Labels
                        </span>
                        {!labelEdit ? (
                          <button
                            onClick={() => setLabelEdit(true)}
                            className="text-sm font-medium text-gray-500 hover:underline"
                          >
                            edit
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setLabelEdit(false)
                              // postData();
                            }}
                            className="text-sm font-medium text-gray-500 hover:underline"
                          >
                            save
                          </button>
                        )}
                      </div>
                      {!labelEdit ? (
                        <ul role="list" className="mt-2 leading-8 space-x-2">
                          {data.ticket.priority === "Low" && (
                            <li className="inline">
                              <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <div className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full bg-blue-500"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3 text-xs font-semibold text-gray-900">
                                  {data.ticket.priority} Priority
                                </div>
                              </div>
                            </li>
                          )}
                          {data.ticket.priority === "Normal" && (
                            <li className="inline">
                              <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <div className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3 text-xs font-semibold text-gray-900">
                                  {data.ticket.priority} Priority
                                </div>
                              </div>
                            </li>
                          )}
                          {data.ticket.priority === "High" && (
                            <li className="inline">
                              <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <div className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full bg-rose-500"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3 text-xs font-semibold text-gray-900">
                                  {data.ticket.priority} Priority
                                </div>
                              </div>
                            </li>
                          )}
                          {data.ticket.status && (
                            <li className="inline">
                              <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <div className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full bg-rose-500"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3 text-xs font-semibold text-gray-900">
                                  {data.ticket.status === "needs_support" && (
                                    <span>Needs Support</span>
                                  )}
                                  {data.ticket.status === "in_progress" && (
                                    <span>In Progress</span>
                                  )}
                                  {data.ticket.status === "in_review" && (
                                    <span>In Review</span>
                                  )}
                                  {data.ticket.status === "done" && (
                                    <span>Done</span>
                                  )}
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
