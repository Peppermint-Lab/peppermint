//@ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "cookies-next";
import moment from "moment";
import { useDebounce } from "use-debounce";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

function isHTML(str) {
  var a = document.createElement("div");
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
}

export default function NotebookEditor() {
  const router = useRouter();
  const token = getCookie("session");

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const [value, setValue] = useState<any>();
  const [note, setNote] = useState();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  const [debouncedValue] = useDebounce(value, 2000);

  async function fetchNotebook() {
    setValue(undefined);
    setLoading(true);
    const res = await fetch(`/api/v1/notebooks/note/${router.query.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    await loadFromStorage(res.note.note).then((content) => {
      setInitialContent(content);
    });
    setNote(res.note);
    setTitle(res.note.title);
    setLoading(false);
  }

  async function updateNoteBook() {
    setSaving(true);
    await fetch(`/api/v1/notebooks/note/${router.query.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: JSON.stringify(debouncedValue),
      }),
    });
    setSaving(false);
    let date = new Date();
    // @ts-ignore
    setLastSaved(new Date(date).getTime());
  }

  useEffect(() => {
    fetchNotebook();
  }, [router]);

  useEffect(() => {
    if (value !== undefined && !loading) {
      updateNoteBook();
    }
  }, [debouncedValue]);

  async function loadFromStorage(val) {
    const storageString = val;

    if (isHTML(storageString)) {
      return undefined;
    } else {
      return storageString
        ? (JSON.parse(storageString) as PartialBlock[])
        : undefined;
    }
  }

  async function convertHTML() {
    //@ts-expect-error
    const blocks = await editor.tryParseHTMLToBlocks(note?.note);
    editor.replaceBlocks(editor.document, blocks);
  }

  useEffect(() => {
    if (initialContent === undefined) {
      convertHTML();
    }
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  const handleInputChange = (editor) => {
    setValue(editor.document);
  };

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
        <div className="m-h-[90vh] p-2">
          <BlockNoteView
            editor={editor}
            sideMenu={false}
            className="m-0 p-0"
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  );
}
