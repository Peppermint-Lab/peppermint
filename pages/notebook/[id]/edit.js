import dynamic from "next/dynamic";
import { useState } from "react";

import rehypeSanitize from "rehype-sanitize";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ViewNoteBook() {
  const [value, setValue] = useState("Test");

  return (
    <div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          NoteBook Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-4">
        <MDEditor
          value={value}
          onChange={setValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
    </div>
  );
}
