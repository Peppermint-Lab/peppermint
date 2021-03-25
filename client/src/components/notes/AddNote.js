import React, { useState, useContext } from "react";
import { EditFilled } from "@ant-design/icons";
import { Input } from "antd";
import { HotKeys } from "react-hotkeys";

import { GlobalContext } from "../../Context/GlobalState";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { saveNote } = useContext(GlobalContext);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [text, setText] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setText(currentContentAsHTML);
  };

  const handlers = {
    CLOSE: () => setModalIsOpen(false),
  };

  return (
    <div>
      <HotKeys handlers={handlers}>
        <div className="ml-10" style={{ marginTop: -3 }}>
          <button onClick={() => setModalIsOpen(!modalIsOpen)}>
            <EditFilled />
          </button>
        </div>
        <div
          className={`${modalIsOpen ? "fixed z-10 inset-0  w-full" : "hidden"}`}
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
              <div>
                <div>
                  <header className="App-header">Create new Note</header>
                  <Input
                    style={{ marginBottom: 5 }}
                    placeholder="Enter a title here.."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={() => {
                    setModalIsOpen(!modalIsOpen);
                    saveNote(text, title);
                    setText("");
                    setTitle("");
                    EditorState.createEmpty()
                  }}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Go back to dashboard to save
                </button>
              </div>
            </div>
          </div>
        </div>
      </HotKeys>
    </div>
  );
};

export default AddNote;
