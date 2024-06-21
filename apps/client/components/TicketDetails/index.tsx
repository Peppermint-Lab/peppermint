//@ts-nocheck
import { Switch } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { notifications } from "@mantine/notifications";
import { Text, Tooltip } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import Frame from "react-frame-component";
import { useDebounce } from "use-debounce";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

import { useUser } from "../../store/session";
import { UserCombo } from "../Combo";

function isHTML(str) {
  var a = document.createElement("div");
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
}
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const ticketStatusMap = [
  { id: 1, value: "needs_support", name: "Needs Support" },
  { id: 2, value: "in_progress", name: "In Progress" },
  { id: 3, value: "in_review", name: "In Review" },
  { id: 4, value: "done", name: "Done" },
];

const priorityOptions = [
  {
    id: "1",
    name: "Low",
    value: "low",
  },
  {
    id: "2",
    name: "Medium",
    value: "medium",
  },
  {
    id: "1",
    name: "High",
    value: "high",
  },
];

export default function Ticket() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");

  const { user } = useUser();

  const fetchTicketById = async () => {
    const id = router.query.id;
    const res = await fetch(`/api/v1/ticket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };

  const { data, status, refetch } = useQuery("fetchTickets", fetchTicketById);

  useEffect(() => {
    refetch();
  }, [router]);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const [edit, setEdit] = useState(false);
  const [editTime, setTimeEdit] = useState(false);
  const [assignedEdit, setAssignedEdit] = useState(false);
  const [labelEdit, setLabelEdit] = useState(false);

  const [users, setUsers] = useState<any>();
  const [n, setN] = useState<any>();

  const [note, setNote] = useState<any>();
  const [issue, setIssue] = useState<any>();
  const [title, setTitle] = useState<any>();
  // const [uploaded, setUploaded] = useState<any>();
  const [priority, setPriority] = useState<any>();
  const [ticketStatus, setTicketStatus] = useState<any>();
  const [comment, setComment] = useState<any>();
  const [timeSpent, setTimeSpent] = useState<any>();
  const [publicComment, setPublicComment] = useState<any>(false);
  const [timeReason, setTimeReason] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const history = useRouter();

  const { id } = history.query;

  async function update() {
    await fetch(`/api/v1/ticket/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        detail: JSON.stringify(debouncedValue),
        note,
        title: debounceTitle,
        priority: priority ? priority.value : undefined,
        status: ticketStatus ? ticketStatus.value : undefined,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setEdit(false);
        // refetch();
      });
  }

  async function updateStatus() {
    await fetch(`/api/v1/ticket/status/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: !data.ticket.isComplete,
        id,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  async function hide(hidden) {
    await fetch(`/api/v1/ticket/status/hide`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hidden,
        id,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  async function addComment() {
    await fetch(`/api/v1/ticket/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: comment,
        id,
        public: publicComment,
      }),
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  async function addTime() {
    await fetch(`/api/v1/time/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        time: timeSpent,
        ticket: id,
        title: timeReason,
        user: user.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setTimeEdit(false);
          refetch();
          notifications.show({
            title: "Time Added",
            message: "Time has been added to the ticket",
            color: "blue",
          });
        }
      });
  }

  async function fetchUsers() {
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
          setUsers(res.users);
        }
      });
  }

  async function transferTicket() {
    if (n !== undefined) {
      await fetch(`/api/v1/ticket/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: n.id,
          id,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", user.id);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(
          `/api/v1/storage/ticket/${router.query.id}/upload/single`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await result.json();

        if (data.success) {
          setFile(null);
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    handleUpload();
  }, [file]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    transferTicket();
  }, [n]);

  const [debouncedValue] = useDebounce(issue, 500);
  const [debounceTitle] = useDebounce(title, 500);

  useEffect(() => {
    update();
  }, [priority, ticketStatus, debounceTitle]);

  useEffect(() => {
    if (issue) {
      update();
    }
  }, [debouncedValue]);

  async function loadFromStorage() {
    const storageString = data.ticket.detail as PartialBlock[];
    if (storageString && isJsonString(storageString)) {
      return JSON.parse(storageString) as PartialBlock[];
    } else {
      return undefined;
    }
  }

  async function convertHTML() {
    const blocks = (await editor.tryParseHTMLToBlocks(
      data.ticket.detail
    )) as PartialBlock[];
    editor.replaceBlocks(editor.document, blocks);
  }

  // Loads the previously stored editor contents.
  useEffect(() => {
    if (status === "success") {
      loadFromStorage().then((content) => {
        setInitialContent(content);
      });
    }
  }, [status, data]);

  useEffect(() => {
    if (initialContent === undefined) {
      convertHTML();
    }
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  const handleInputChange = (editor) => {
    setIssue(editor.document);
  };

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
        </div>
      )}

      {status === "success" && (
        <main className="flex-1 min-h-[90vh] py-8">
          <div className="mx-auto max-w-7xl w-full px-4 flex flex-col xl:flex-row justify-center">
            <div className="xl:border-r xl:border-gray-200 xl:pr-8 xl:w-2/3">
              <div className="">
                <div className="md:flex md:justify-between md:space-x-4 xl:border-b xl:pb-4">
                  <div className="w-full">
                    <div className="flex flex-row space-x-1">
                      <h1 className="text-2xl mt-[5px] font-bold text-gray-900 dark:text-white">
                        #{data.ticket.Number} -
                      </h1>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        style={{ fontSize: "1.5rem" }}
                        className="border-none w-1/2 block text-gray-900 font-bold focus:outline-none focus:ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        value={title}
                        defaultValue={data.ticket.title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 text-xs flex flex-row items-center space-x-1 text-gray-500 dark:text-white">
                      {!data.ticket.isComplete ? (
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {t("open_issue")}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {t("closed_issue")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <aside className="mt-4 xl:hidden">
                  <div className="py-3 border-b border-gray-200">
                    <div className="border-t border-gray-200">
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 mt-2">
                          {t("labels")}
                        </span>
                        <span className="text-sm font-medium text-gray-500 mt-2">
                          {t("edit-btn")}
                        </span>
                      </div>
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
                                {data.ticket.priority} {t("priority")}
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
                                {data.ticket.priority} {t("priority")}
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
                                {data.ticket.priority} {t("priority")}
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
                                {ticketStatusMap[data.ticket.status]}
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </aside>
                <div className="py-3 xl:pb-0 xl:pt-2">
                  <div className="flex flex-row items-center text-sm space-x-1">
                    {data.ticket.fromImap ? (
                      <>
                        <span className="font-bold">{data.ticket.email}</span>
                        <span>created via email at </span>
                        <span className="font-bold">
                          {moment(data.ticket.createdAt).format("DD/MM/YYYY")}
                        </span>
                      </>
                    ) : (
                      <>
                        {data.ticket.createdBy ? (
                          <>
                            <span>
                              Created by{" "}
                              <strong>{data.ticket.createdBy.name}</strong> at{" "}
                            </span>
                            <span className="">
                              {moment(data.ticket.createdAt).format("LLL")}
                              {data.ticket.client && (
                                <span>
                                  {" "}
                                  for <strong>{data.ticket.client.name}</strong>
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>Created at </span>
                            <span className="">
                              <strong>
                                {moment(data.ticket.createdAt).format("LLL")}
                              </strong>
                              {data.ticket.client && (
                                <span>
                                  {" "}
                                  for <strong>{data.ticket.client.name}</strong>
                                </span>
                              )}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="prose max-w-none mt-2">
                    {!data.ticket.fromImap ? (
                      <>
                        <BlockNoteView
                          editor={editor}
                          sideMenu={false}
                          className="m-0 p-0"
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <div className="">
                        <div className="break-words bg-white rounded-md text-black">
                          <Frame
                            className="min-h-[60vh] h-full w-full"
                            initialContent={data.ticket.detail}
                          />
                        </div>
                      </div>
                    )}
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
                        className="text-lg font-medium text-gray-900 dark:text-white"
                      >
                        {t("comments")}
                      </span>
                    </div>
                    <div className="pt-2">
                      {/* Activity feed*/}
                      <div className="flow-root">
                        <ul role="list" className="-mb-8">
                          {data.ticket.comments.length > 0 &&
                            data.ticket.comments.map(
                              (item: any, itemIdx: any) => (
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
                                            <span className="font-medium text-gray-900 dark:text-white ">
                                              {item.user.name}
                                            </span>
                                          </div>
                                          <div className=" flex flex-row space-x-1">
                                            <span className="text-xs text-gray-500 dark:text-white">
                                              {item.public
                                                ? "Publicly"
                                                : "Internally"}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-white">
                                              commented at
                                            </span>

                                            <span className="text-xs text-gray-500 dark:text-white">
                                              {moment(item.createdAt).format(
                                                "DD/MM/YYYY hh:mm"
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-sm  text-gray-900 dark:text-white">
                                          <span>{item.text}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <div className="flex space-x-3">
                          <div className="min-w-0 flex-1">
                            <div>
                              <div>
                                <label htmlFor="comment" className="sr-only">
                                  {t("comment")}
                                </label>
                                <textarea
                                  id="comment"
                                  name="comment"
                                  rows={3}
                                  className="block w-full dark:bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                  placeholder="Leave a comment"
                                  defaultValue={""}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Text as="label" size="2">
                                  <div className="flex flex-row items-center space-x-2">
                                    <Switch
                                      checked={publicComment}
                                      onChange={setPublicComment}
                                      className={`${
                                        publicComment
                                          ? "bg-blue-600"
                                          : "bg-gray-200"
                                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                                    >
                                      <span className="sr-only">
                                        Enable notifications
                                      </span>
                                      <span
                                        className={`${
                                          publicComment
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                      />
                                    </Switch>
                                    <Tooltip content="Enabling this will mean the email registered to the ticket will get a reply based on your comment.">
                                      <Text> Public Reply</Text>
                                    </Tooltip>
                                  </div>
                                </Text>
                              </div>
                              <div className="mt-4 flex items-center justify-end space-x-4">
                                {data.ticket.isComplete ? (
                                  <button
                                    type="button"
                                    onClick={() => updateStatus()}
                                    className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    <CheckCircleIcon
                                      className="-ml-0.5 h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                    <span className="">
                                      {t("reopen_issue")}
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => updateStatus()}
                                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    <CheckCircleIcon
                                      className="-ml-0.5 h-5 w-5 text-green-500"
                                      aria-hidden="true"
                                    />
                                    {t("close_issue")}
                                  </button>
                                )}
                                <button
                                  onClick={() => addComment()}
                                  type="submit"
                                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                >
                                  {t("comment")}
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
            <div className="hidden xl:block xl:pl-8 xl:order-2 order-1">
              <h2 className="sr-only">{t("details")}</h2>
              <div className="space-y-1  border-gray-200 py-2">
                {users && (
                  <UserCombo
                    value={users}
                    update={setN}
                    defaultName={
                      data.ticket.assignedTo ? data.ticket.assignedTo.name : ""
                    }
                  />
                )}
                <UserCombo
                  value={priorityOptions}
                  update={setPriority}
                  defaultName={data.ticket.priority ? data.ticket.priority : ""}
                  hideInitial={true}
                />
                <UserCombo
                  value={ticketStatusMap}
                  update={setTicketStatus}
                  defaultName={data.ticket.status ? data.ticket.status : ""}
                  hideInitial={true}
                />

                {/* <div className="border-t border-gray-200">
                  <div className="flex flex-row items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-white">
                      Time Tracking
                    </span>
                    {!editTime ? (
                      <button
                        onClick={() => setTimeEdit(true)}
                        className="text-sm font-medium text-gray-500 hover:underline dark:text-white"
                      >
                        add
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setTimeEdit(false);
                          addTime();
                        }}
                        className="text-sm font-medium text-gray-500 hover:underline dark:text-white"
                      >
                        save
                      </button>
                    )}
                  </div>
                  {data.ticket.TimeTracking.length > 0 ? (
                    data.ticket.TimeTracking.map((i: any) => (
                      <div key={i.id} className="text-xs">
                        <div className="flex flex-row space-x-1.5 items-center dark:text-white">
                          <span>{i.user.name} / </span>
                          <span>{i.time} minutes</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <span className="text-xs dark:text-white">
                        No Time added
                      </span>
                    </div>
                  )}
                  {editTime && (
                    <div>
                      <div className="mt-2 flex flex-col space-y-2">
                        <input
                          type="text"
                          name="text"
                          id="timespent_text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="What did you do?"
                          value={timeReason}
                          onChange={(e) => setTimeReason(e.target.value)}
                        />
                        <input
                          type="number"
                          name="number"
                          id="timespent"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Time in minutes"
                          value={timeSpent}
                          onChange={(e) => setTimeSpent(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div> */}
                {/* <div className="border-t border-gray-200">
                  <div className="flex flex-row items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-white">
                      Attachments
                    </span>
                    <button
                      className="text-sm font-medium text-gray-500 hover:underline dark:text-white"
                      onClick={handleButtonClick}
                    >
                      upload
                      <input
                        id="file"
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </button>
                  </div>

                  <>
                    {data.ticket.files.length > 0 &&
                      data.ticket.files.map((file: any) => (
                        <div className="p-1/2 px-1  hover:bg-gray-200 hover:cursor-pointer">
                          <span className="text-xs">{file.filename}</span>
                        </div>
                      ))}
                    {file && (
                      <div className="p-1/2 px-1">
                        <span className="text-xs">{file.name}</span>
                      </div>
                    )}
                  </>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
