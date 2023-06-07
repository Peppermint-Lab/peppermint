import React, { useState, useEffect, Fragment } from "react";
import { message, Upload, Divider } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  HomeIcon,
  Bars4Icon,
  UserCircleIcon,
  BellIcon,
  LockOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarIcon,
  TagIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import TextAlign from '@tiptap/extension-text-align';
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { notifications } from "@mantine/notifications";

const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Eduardo Benz", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
    date: "6d ago",
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Hilary Mahy", href: "#" },
    assigned: { name: "Kristin Watson", href: "#" },
    date: "2d ago",
  },
  {
    id: 3,
    type: "tags",
    person: { name: "Hilary Mahy", href: "#" },
    tags: [
      { name: "Bug", href: "#", color: "bg-rose-500" },
      { name: "Accessibility", href: "#", color: "bg-indigo-500" },
    ],
    date: "6h ago",
  },
  {
    id: 4,
    type: "comment",
    person: { name: "Jason Meyers", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
    date: "2h ago",
  },
];

import TicketFiles from "../TicketFiles";
import ClientNotesModal from "../ClientNotesModal";
import TransferTicket from "../TransferTicket";
import TipTapEditor from "../TipTapEditor";
import renderHTML from "react-render-html";
import LinkTicket from "../LinkTicketModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TicketDetail(props) {
  const [ticket, setTicket] = useState(props.ticket);
  const [edit, setEdit] = useState(false);

  const [note, setNote] = useState(props.ticket.note);
  const [issue, setIssue] = useState(props.ticket.detail);
  const [title, setTitle] = useState(props.ticket.title);
  const [name, setName] = useState(props.ticket.name);
  const [email, setEmail] = useState(props.ticket.email);
  const [number, setNumber] = useState(props.ticket.number);
  const [badge, setBadge] = useState("");
  const [uploaded, setUploaded] = useState();
  const [priority, setPriority] = useState(props.ticket.priority);

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

  const ActivityEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: note,
    onUpdate({ editor }) {
      setNote(editor.getHTML());
    },
  });

  const history = useRouter();

  const { id } = history.query;

  let file = [];

  useEffect(() => {
    if (ticket.priority === "Low") {
      setBadge(low);
    }
    if (ticket.priority === "Normal") {
      setBadge(normal);
    }
    if (ticket.priority === "High") {
      setBadge(high);
    }
  }, []);

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
        priority,
      }),
    })
      .then((res) => res.json())
      .then(() => history.reload());
  }

  async function updateStatus() {
    await fetch(`/api/v1/ticket/${id}/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !props.ticket.isComplete,
      }),
    })
      .then((res) => res.json())
      .then(() => history.reload());
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

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div>
      <main className="flex-1">
        <div className="py-8 xl:py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
            <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
              <div>
                <div>
                  <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">
                        {/* #400 opened by */}
                        <span className="font-medium text-gray-900">
                          {email}
                        </span>{" "}
                        via
                        <a href="#" className="font-medium text-gray-900">
                          {ticket.fromImap === true
                            ? " Email"
                            : " Ticket Creation"}
                        </a>
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                      <button
                        type="button"
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PencilIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <BellIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <aside className="mt-8 xl:hidden">
                    <h2 className="sr-only">Details</h2>
                    <div className="space-y-5">
                      {ticket.isComplete ? (
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
                          <span className="text-sm font-medium text-green-700">
                            Closed Issue
                          </span>
                        </div>
                      )}
                      {/* <div className="flex items-center space-x-2">
                        <ChatBubbleLeftEllipsisIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          4 comments
                        </span>
                      </div> */}
                      <div className="flex items-center space-x-2">
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Created on{" "}
                          <time dateTime="2020-12-02">Dec 2, 2020</time>
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 space-y-8 border-b border-t border-gray-200 py-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Assignees
                        </h2>
                        <ul role="list" className="mt-3 space-y-3">
                          <li className="flex justify-start">
                            <a href="#" className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-5 w-5 rounded-full"
                                  src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Eduardo Benz
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">
                          Tags
                        </h2>
                        <ul role="list" className="mt-2 leading-8">
                          <li className="inline">
                            <a
                              href="#"
                              className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <div className="absolute flex flex-shrink-0 items-center justify-center">
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-rose-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3 text-xs font-semibold text-gray-900">
                                Bug
                              </div>
                            </a>{" "}
                          </li>
                          <li className="inline">
                            <a
                              href="#"
                              className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <div className="absolute flex flex-shrink-0 items-center justify-center">
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3 text-xs font-semibold text-gray-900">
                                Accessibility
                              </div>
                            </a>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </aside>
                  <div className="py-3 xl:pb-0 xl:pt-6">
                    <h2 className="sr-only">Description</h2>
                    <div className="prose max-w-none">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Expedita, hic? Commodi cumque similique id tempora
                        molestiae deserunt at suscipit, dolor voluptatem,
                        numquam, harum consequatur laboriosam voluptas tempore
                        aut voluptatum alias?
                      </p>
                      <ul role="list">
                        <li>
                          Tempor ultrices proin nunc fames nunc ut auctor vitae
                          sed. Eget massa parturient vulputate fermentum id
                          facilisis nam pharetra. Aliquet leo tellus.
                        </li>
                        <li>
                          Turpis ac nunc adipiscing adipiscing metus tincidunt
                          senectus tellus.
                        </li>
                        <li>
                          Semper interdum porta sit tincidunt. Dui suspendisse
                          scelerisque amet metus eget sed. Ut tellus in sed
                          dignissim.
                        </li>
                      </ul>
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
                    <div className="pb-4">
                      <h2
                        id="activity-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Activity
                      </h2>
                    </div>
                    <div className="pt-6">
                      {/* Activity feed*/}
                      <div className="flow-root">
                        <ul role="list" className="-mb-8">
                          {activity.map((item, itemIdx) => (
                            <li key={item.id}>
                              <div className="relative pb-8">
                                {itemIdx !== activity.length - 1 ? (
                                  <span
                                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div className="relative flex items-start space-x-3">
                                  {item.type === "comment" ? (
                                    <>
                                      <div className="relative">
                                        <img
                                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                          src={item.imageUrl}
                                          alt=""
                                        />

                                        <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                                          <ChatBubbleLeftEllipsisIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div>
                                          <div className="text-sm">
                                            <a
                                              href={item.person.href}
                                              className="font-medium text-gray-900"
                                            >
                                              {item.person.name}
                                            </a>
                                          </div>
                                          <p className="mt-0.5 text-sm text-gray-500">
                                            Commented {item.date}
                                          </p>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <p>{item.comment}</p>
                                        </div>
                                      </div>
                                    </>
                                  ) : item.type === "assignment" ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                            <UserCircleIcon
                                              className="h-5 w-5 text-gray-500"
                                              aria-hidden="true"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          <a
                                            href={item.person.href}
                                            className="font-medium text-gray-900"
                                          >
                                            {item.person.name}
                                          </a>{" "}
                                          assigned{" "}
                                          <a
                                            href={item.assigned.href}
                                            className="font-medium text-gray-900"
                                          >
                                            {item.assigned.name}
                                          </a>{" "}
                                          <span className="whitespace-nowrap">
                                            {item.date}
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                            <TagIcon
                                              className="h-5 w-5 text-gray-500"
                                              aria-hidden="true"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-0">
                                        <div className="text-sm leading-8 text-gray-500">
                                          <span className="mr-0.5">
                                            <a
                                              href={item.person.href}
                                              className="font-medium text-gray-900"
                                            >
                                              {item.person.name}
                                            </a>{" "}
                                            added tags
                                          </span>{" "}
                                          <span className="mr-0.5">
                                            {item.tags.map((tag) => (
                                              <Fragment key={tag.name}>
                                                <a
                                                  href={tag.href}
                                                  className="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                  <span className="absolute flex flex-shrink-0 items-center justify-center">
                                                    <span
                                                      className={classNames(
                                                        tag.color,
                                                        "h-1.5 w-1.5 rounded-full"
                                                      )}
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                  <span className="ml-3 font-semibold text-gray-900">
                                                    {tag.name}
                                                  </span>
                                                </a>{" "}
                                              </Fragment>
                                            ))}
                                          </span>
                                          <span className="whitespace-nowrap">
                                            {item.date}
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <img
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                alt=""
                              />

                              <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                                <ChatBubbleLeftEllipsisIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <form action="#">
                              <div>
                                <label htmlFor="comment" className="sr-only">
                                  Comment
                                </label>
                                <textarea
                                  id="comment"
                                  name="comment"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                  placeholder="Leave a comment"
                                  defaultValue={""}
                                />
                              </div>
                              <div className="mt-6 flex items-center justify-end space-x-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  <CheckCircleIcon
                                    className="-ml-0.5 h-5 w-5 text-green-500"
                                    aria-hidden="true"
                                  />
                                  Close issue
                                </button>
                                <button
                                  type="submit"
                                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                >
                                  Comment
                                </button>
                              </div>
                            </form>
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
                <div className="flex items-center space-x-2">
                  <LockOpenIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-green-700">
                    Open Issue
                  </span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <ChatBubbleLeftEllipsisIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    4 comments
                  </span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Created on <time dateTime="2020-12-02">Dec 2, 2020</time>
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Assignees
                  </h2>
                  <ul role="list" className="mt-3 space-y-3">
                    <li className="flex justify-start">
                      <a href="#" className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-5 w-5 rounded-full"
                            src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          Eduardo Benz
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Tags</h2>
                  <ul role="list" className="mt-2 leading-8">
                    <li className="inline">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <div className="absolute flex flex-shrink-0 items-center justify-center">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-rose-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 text-xs font-semibold text-gray-900">
                          Bug
                        </div>
                      </a>{" "}
                    </li>
                    <li className="inline">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <div className="absolute flex flex-shrink-0 items-center justify-center">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 text-xs font-semibold text-gray-900">
                          Accessibility
                        </div>
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
