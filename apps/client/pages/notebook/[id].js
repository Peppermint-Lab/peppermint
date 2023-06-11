import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import TextAlign from '@tiptap/extension-text-align';
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useDebounce } from "use-debounce";
import moment from "moment";

export default function Notebooks() {
  const router = useRouter();

  const [notebook, setNoteBook] = useState("");
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  const [value] = useDebounce(notebook, 2000);

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
    if (editor) {
      const res = await fetch(`/api/v1/note/${router.query.id}`).then((res) =>
        res.json()
      );
      editor.commands.setContent(res.data.note);
      setTitle(res.data.title);
      setLoading(false);
    }
  }

  async function updateNoteBook() {
    setSaving(true);
    const res = await fetch(`/api/v1/note/${router.query.id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: notebook,
      }),
    });
    setSaving(false);
    let date = new Date();
    setLastSaved(new Date(date).getTime());
  }

  useEffect(() => {
    fetchNotebook();
  }, [editor, router]);

  useEffect(() => {
    if (notebook !== undefined) {
      updateNoteBook();
    }
  }, [value]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {saving ? (
          <span className="text-xs">
            saving .... 
          </span>
        ) : (
          <span className="text-xs">
            last saved: {moment(lastSaved).format("hh:mm:ss")}
          </span>
        )}
      </div>
      <RichTextEditor editor={editor}>
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
    </>
  );
}
