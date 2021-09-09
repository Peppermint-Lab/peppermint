import React, { useState } from "react";
import { Divider } from "antd";
import { HotKeys } from "react-hotkeys";
import DOMPurify from "dompurify";

const ViewNote = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const [text, setText] = useState(props.note.note);

  const handlers = {
    CLOSE: () => setShow(false),
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  async function postData() {
    try {
      await fetch(`/api/v1/note/updateNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: text,
          id: props.note.id,
        }),
      }).then((res) => res.json());
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <HotKeys handlers={handlers}>
        <div className="mr-2">
          <button
            onClick={() => setShow(!show)}
            type="button"
            className="px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View
          </button>
        </div>
        <div
          className={`${show ? "fixed z-10 inset-0  w-full" : "hidden"}`}
          aria-labelledby="dialog-1-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w sm:w-1/2 sm:p-6">
              <div className="text-lg">
                <h1 className={edit ? "hidden" : ""}>{props.note.title}</h1>
                <input
                  className={edit ? "" : "hidden"}
                  defaultValue={props.note.title}
                />
              </div>
              <Divider />
              <div
                className={edit ? "hidden" : "preview"}
                dangerouslySetInnerHTML={createMarkup(text)}
              ></div>
              <div className={edit ? "" : "hidden"}>
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="16"
                  defaultValue={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="flex flex-row mt-16">
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  type="button"
                  className={
                    edit
                      ? "hidden"
                      : "flex justify-center w-1/4 rounded-md border border-transparent shadow-sm px-4 py-2 mx-auto bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShow(false);
                    setEdit(false);
                    postData();
                  }}
                  type="button"
                  className={
                    edit
                      ? "flex justify-center w-1/4 rounded-md border border-transparent shadow-sm px-4 py-2 mx-auto bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      : "hidden"
                  }
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  type="button"
                  className="flex justify-center w-1/4 rounded-md border border-transparent shadow-sm px-4 py-2 mx-auto bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </HotKeys>
    </div>
  );
};

export default ViewNote;
