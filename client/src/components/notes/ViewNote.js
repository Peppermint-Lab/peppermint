import React, { useState } from "react";
import { Button } from "antd";
import { HotKeys } from "react-hotkeys";
import DOMPurify from 'dompurify';

const ViewNote = (props) => {
  const [show, setShow] = useState(false);

  const handlers = {
    CLOSE: () => setShow(false),
  };

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div>
      <HotKeys handlers={handlers}>
        <div className="ml-10">
          <Button size="xs" style={{ marginRight: 10}} onClick={() => setShow(!show)}>View</Button>
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
            <div className="preview" dangerouslySetInnerHTML={createMarkup(props.note.note)}></div>
            </div>
          </div>
        </div>
      </HotKeys>
    </div>
  );
};

export default ViewNote;
