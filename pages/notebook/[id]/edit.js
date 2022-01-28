import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ViewNoteBook() {
  const router = useRouter();

  const { id } = router.query;

  async function getMarkdown() {
    const res = await fetch(`/api/v1/note/${id}`);
    return res.json();
  }
  const { data, status, error } = useQuery("edit", getMarkdown);

  const [title, setTitle] = useState();
  const [note, setNote] = useState("");

  async function save() {
    await fetch(`/api/v1/note/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        note,
      }),
    });
  }

  React.useEffect(() => {
    if (!title && data) {
      setNote(data.data.note);
      setTitle(data.data.title);
    }
  }, [data]);

  return (
    <div>
      <div className="mt-4">
        {status === "success" && (
          <div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                NoteBook Title
              </label>
              <div className="mt-1 mb-4">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <MDEditor value={note} onChange={setNote} height="75vh" />
            <button
              onClick={async () => {
                await save();
                router.reload(router.pathname);
              }}
              type="button"
              className="mt-4 float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
