import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { useState } from "react";
// import TextAlign from '@tiptap/extension-text-align';
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { getCookie } from "cookies-next";

export default function ViewNoteBook() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Markdown Test");

  const token = getCookie("session");

  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  async function postMarkdown() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notebook/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({
        title,
        content: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        router.push(`/notebook`);
      });
  }

  return (
    <div className="">
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
            placeholder="Notebook title goes here..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
      </div>

      <div className="mt-4 h-full">
        <div className="m-h-[90vh]">
          <RichTextEditor editor={editor} >
            <RichTextEditor.Toolbar>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content  />
          </RichTextEditor>
        </div>

        <div className="mt-4 float-right">
          <button
            onClick={() => postMarkdown()}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
