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
import useTranslation from "next-translate/useTranslation";

export default function ViewNoteBook() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const { t } = useTranslation("peppermint");

  const token = getCookie("session");

  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc"
          }
        }
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm sm:prose-base [&ul]:list-disc"
      }
    },
    content: value,
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  async function postMarkdown() {
    await fetch(`/api/v1/notebook/note/create`, {
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
      <div className="flex flex-row justify-between items-center border-b-[1px] px-4">
        <input
          type="text"
          name="title"
          id="title"
          className="focus:none block w-full sm:text-sm border-none border-transparent focus:border-transparent focus:ring-0 rounded-none dark:bg-[#0A090C] dark:text-white"
          placeholder="Notebook title goes here..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => postMarkdown()}
          type="button"
          className="inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {t("save")}
        </button>
      </div>

      <div className="h-full">
        <div className="m-h-[90vh]">
          <RichTextEditor
            editor={editor}
            className="dark:bg-gray-900 dark:text-white rounded-none border-none"
          >
            <RichTextEditor.Toolbar className="dark:text-white rounded-none dark:bg-[#0A090C]">
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

            <RichTextEditor.Content className="dark:bg-[#0A090C] dark:text-white min-h-[50vh] rounded-none" />
          </RichTextEditor>
        </div>
      </div>
    </div>
  );
}
