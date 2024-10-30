import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";


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
      

      <div className="h-full">
        <div className="m-h-[90vh] p-2">
        
        </div>
      </div>
    </div>
  );
}
