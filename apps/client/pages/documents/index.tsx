import { Button } from "@/shadcn/ui/button";
import { getCookie } from "cookies-next";
import { Ellipsis } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useUser } from "../../store/session";

function groupDocumentsByDate(notebooks) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return notebooks.reduce(
    (groups, notebook) => {
      const updatedAt = new Date(notebook.updatedAt);

      if (updatedAt.toDateString() === today.toDateString()) {
        groups.today.push(notebook);
      } else if (updatedAt.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(notebook);
      } else if (isThisWeek(updatedAt, today)) {
        groups.thisWeek.push(notebook);
      } else if (isThisMonth(updatedAt, today)) {
        groups.thisMonth.push(notebook);
      } else {
        groups.older.push(notebook);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      older: [],
    }
  );
}

function isThisWeek(date, today) {
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  return date >= weekStart;
}

function isThisMonth(date, today) {
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

async function fetchNotebooks(token) {
  const res = await fetch(`/api/v1/notebooks/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default function NoteBooksIndex() {
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");
  const { data, status, error } = useQuery("getUsersNotebooks", () =>
    fetchNotebooks(token)
  );

  const router = useRouter();

  async function createNew() {
    await fetch(`/api/v1/notebook/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Untitled",
        content: "",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.id) {
          router.push(`/documents/${res.id}`);
        }
      });
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-foreground">
            Documents
          </h1>
          {/* <p className="mt-2 text-sm text-foreground">
            Documents can be private, shared with others, or public.
          </p> */}
        </div>
      </div>
      <div className="mt-8 w-full flex justify-center">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error loading documents.</p>}
        {data && data.notebooks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No documents found.</p>
            <Button variant="outline" size="sm" onClick={() => createNew()}>
              New Document
            </Button>
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-2xl justify-center space-y-4">
            <div className="flex flex-row justify-end mb-4">
              <Button variant="outline" size="sm" onClick={() => createNew()}>
                New Document
              </Button>
            </div>
            {data?.notebooks &&
              Object.entries(groupDocumentsByDate(data.notebooks)).map(
                ([period, docs]) =>
                  Array.isArray(docs) &&
                  docs.length > 0 && (
                    <div key={period} className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                        {period.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <div className="space-y-1">
                        {docs.map((item) => (
                          <button
                            key={item.id}
                            className="flex flex-row w-full justify-between items-center align-middle transition-colors"
                            onClick={() => router.push(`/documents/${item.id}`)}
                          >
                            <h2 className="text-md font-semibold text-gray-900 dark:text-white">
                              {item.title}
                            </h2>
                            <div className="space-x-2 flex flex-row items-center">
                              <span className="text-sm text-gray-500">
                                {new Date(item.updatedAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
}
