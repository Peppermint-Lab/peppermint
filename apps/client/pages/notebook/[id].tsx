import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const Editor = dynamic(() => import("../../components/NotebookEditor"), {
  ssr: false,
});

export default function Notebooks() {
  const router = useRouter();
  const token = getCookie("session");

  const [value, setValue] = useState();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  return (
    <>
      <Editor />
    </>
  );
}
