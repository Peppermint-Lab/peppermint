//@ts-nocheck
import { toast } from "@/shadcn/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { getCookie } from "cookies-next";
import { Ellipsis } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useUser } from "../../store/session";

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

  const user = useUser();

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

  const [debouncedValue] = useDebounce(value, 500);
  const [debounceTitle] = useDebounce(title, 500);

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
    if (res.note.userId !== user.user.id) {
      router.back();
    }
    await loadFromStorage(res.note.note).then((content) => {
      setInitialContent(content);
    });
    setNote(res.note);
    setTitle(res.note.title);
    setLoading(false);
  }

  async function updateNoteBook() {
    setSaving(true);
    const res = await fetch(`/api/v1/notebooks/note/${router.query.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: debounceTitle,
        content: JSON.stringify(debouncedValue),
      }),
    });
    const data = await res.json();
    setSaving(false);
    let date = new Date();
    // @ts-ignore
    setLastSaved(new Date(date).getTime());
    if(data.status) {
      toast({
        variant: "destructive",
        title: "Error -> Unable to update",
        description: data.message,
      });
    }
  }

  async function deleteNotebook(id) {
    if (window.confirm("Do you really want to delete this notebook?")) {
      await fetch(`/api/v1/notebooks/note/${router.query.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.push("/documents");
          } else {
            toast({
              variant: "destructive",
              title: "Error -> Unable to delete",
              description: res.message,
            });
          }
        });
    }
  }

  useEffect(() => {
    fetchNotebook();
  }, [router]);

  useEffect(() => {
    if (debouncedValue || debounceTitle) {
      updateNoteBook();
    }
  }, [debouncedValue, debounceTitle]);

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
      <div className="flex flex-row items-center justify-end py-1 px-6 space-x-4 mt-2">
        {saving ? (
          <span className="text-xs">saving ....</span>
        ) : (
          <span className="text-xs cursor-pointer">
            last saved: {moment(lastSaved).format("hh:mm:ss")}
          </span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6">
            <DropdownMenuItem
              className="hover:bg-red-600"
              onClick={() => deleteNotebook()}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!loading && (
        <div className="m-h-[90vh] p-2 w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="flex flex-row items-center justify-between">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl px-0 font-bold w-full border-none bg-transparent outline-none focus:ring-0 focus:outline-none"
              />
            </div>

            <BlockNoteView
              editor={editor}
              sideMenu={false}
              className="m-0 p-0"
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
