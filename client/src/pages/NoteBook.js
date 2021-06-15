import React, { useEffect, useContext } from "react";
import moment from "moment";

import { GlobalContext } from "../Context/GlobalState";

import AddNote from "../components/notes/AddNote";
import ViewNote from "../components/notes/ViewNote";

const NoteBook = () => {
  const { notes, getNotes, deleteNote } = useContext(GlobalContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 flex flex-col">
        <div className="flex flex-row align-middle items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Notebook</h1>
          <AddNote />
        </div>

        <main>
          {notes.length === 0 ? (
            <p className="mt-4">You have no notes :(</p>
          ) : (
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {notes.map((item) => (
                <div
                  key={item.name}
                  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                >
                  <dt className="text-xl font-medium text-gray-900 truncate">
                    {item.title}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">
                  <span>Created On {moment(item.updatedAt).format("DD/MM/YYYY")}</span>
                  </dd>
                  <div className="flex flex-row mt-2">
                    <ViewNote note={item} />
                    <button
                      onClick={() => deleteNote(item.id)}
                      type="button"
                      className="px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </main>
      </div>
    </div>
  );
};

export default NoteBook;
