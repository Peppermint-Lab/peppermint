import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/BlockEditor"), {
  ssr: false,
});

export default function ViewNoteBook() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const { t } = useTranslation("peppermint");

  const token = getCookie("session");

  const router = useRouter();

  async function postMarkdown() {
    await fetch(`/api/v1/notebook/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content: JSON.stringify(value),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        router.push(`/notebook`);
      });
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center border-b-[1px] py-1">
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
          className="inline-flex items-center px-4 py-1 mr-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {t("save")}
        </button>
      </div>

      <div className="h-full">
        <div className="m-h-[90vh] p-2">
          <Editor setIssue={setValue} />
        </div>
      </div>
    </div>
  );
}
