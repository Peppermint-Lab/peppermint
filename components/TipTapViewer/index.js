import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TipTapViewer({ value }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="viewer">
      <EditorContent editor={editor} />
    </div>
  );
}
