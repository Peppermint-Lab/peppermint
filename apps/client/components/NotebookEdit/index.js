import React, { useEffect, useState } from "react";

import TipTapEditor from "../TipTapEditor";

export default function ViewNoteBook({ data }) {
  const [title, setTitle] = useState();
  const [note, setNote] = useState();

  async function save() {
    await fetch(`/api/v1/note/${data.id}/update`, {
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

  useEffect(() => {
    setTitle(data.title)
    setNote(data.note)
  }, [data])

  console.log(note)

  return (
    <>
      <div className="mb-4 -mt-2">
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full sm:text-3xl font-bold border-none bg-transparent focus:none focus:border-transparent focus:ring-0"
          placeholder="Untitled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {note !== undefined && (
        <TipTapEditor value={note} setContent={setNote} />
      )}
      <button
        onClick={() =>save()}
        type="button"
        className="mt-4 float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Save Note
      </button>
    </>
  );
}
