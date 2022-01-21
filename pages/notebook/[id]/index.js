import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ViewNoteBook() {
  const router = useRouter();

  async function getMarkdown() {
    const res = await fetch("/api/v1/note/2");
    return res.json();
  }

  const { data, status, error } = useQuery("viewMarkdown", getMarkdown);

//   console.log(data.data)

  return (
    <div>
      {status === "success" && (
        <div>
          <MDEditor value={data.data.note}  />
          {/* <MDEditor.Markdown source="hi" /> */}
        </div>
      )}
    </div>
  );
}
