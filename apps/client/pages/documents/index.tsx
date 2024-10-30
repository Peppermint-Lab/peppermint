import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

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
  const { data, status, error, refetch } = useQuery("getUsersNotebooks", () =>
    fetchNotebooks(token)
  );

  const router = useRouter();

  async function deleteNotebook(id) {
    if (window.confirm("Do you really want to delete this notebook?")) {
      const res = await fetch(`/api/v1/note/${id}/delete`).then((res) =>
        res.json()
      );
      console.log(res);
      refetch();
    }
  }

  async function createNew() {
    await fetch(`/api/v1/notebook/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "",
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
          <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Documents
          </h1>
          <p className="mt-2 text-sm text-foreground">
            Documents are a collection of notes, notebooks, and other resources,
            all in one place. They can be private, shared with others, or
            public.
          </p>
        </div>
      </div>
      <div className="mt-8">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error loading documents.</p>}
        {data && data.notebooks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No documents found.</p>
            <button
              onClick={() => createNew()}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Create
            </button>
          </div>
        ) : (
          <div className="flex flex-col shadow-md">
            {data?.notebooks.map((item) => (
              <button
                key={item.id}
                className="p-4 flex flex-row w-full bg-background justify-between items-center align-middle rounded-lg shadow "
                onClick={() => router.push(`/documents/${item.id}`)}
              >
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => deleteNotebook(item.id)}
                  className="mt-4 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
