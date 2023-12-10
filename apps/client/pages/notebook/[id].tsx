import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import TextAlign from '@tiptap/extension-text-align';
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { getCookie } from "cookies-next";
import moment from "moment";

export default function Notebooks() {
  const router = useRouter();
  const token = getCookie("session");

  const [notebook, setNoteBook] = useState("");
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  // const [value] = useDebounce(notebook, 2000);

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
    content: notebook,
    onUpdate({ editor }) {
      setNoteBook(editor.getHTML());
    },
  });

  async function fetchNotebook() {
    setNoteBook("");
    setLoading(true);
    if (editor) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notebooks/note/${router.query.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      console.log(res);
      editor.commands.setContent(res.note.note);
      setTitle(res.note.title);
      setLoading(false);
    }
  }

  async function updateNoteBook() {
    setSaving(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notebooks/note/${router.query.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: notebook,
        }),
      }
    );
    setSaving(false);
    let date = new Date();
    // @ts-ignore
    setLastSaved(new Date(date).getTime());
  }

  useEffect(() => {
    fetchNotebook();
  }, [editor, router]);

  useEffect(() => {
    if (notebook !== undefined && !loading) {
      updateNoteBook();
    }
  }, [notebook]);

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b-[1px] py-1 px-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {saving ? (
          <span className="text-xs">saving ....</span>
        ) : (
          <span className="text-xs">
            last saved: {moment(lastSaved).format("hh:mm:ss")}
          </span>
        )}
      </div>
      {!loading && (
        <RichTextEditor editor={editor} className="rounded-none border-none">
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

          <RichTextEditor.Content />
        </RichTextEditor>
      )}
    </>
  );
}
