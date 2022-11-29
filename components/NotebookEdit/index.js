import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import TipTapEditor from "../TipTapEditor";

export default function ViewNoteBook({ id }) {
  const router = useRouter();

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
    if (data) {
      setNote(data.data.note);
      setTitle(data.data.title);
    }
  }, [data]);

  return (
    <div className="">
      {status === "success" && (
        <div>
          <div>
            <div className="mt-1 mb-4">
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full sm:text-4xl font-bold border-none bg-transparent focus:none focus:border-transparent focus:ring-0"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <TipTapEditor value={note} setContent={setNote} />
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
  );
}
