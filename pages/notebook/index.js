import Link from "next/link";
import { useQuery } from "react-query";

async function notebooks() {
  const res = await fetch("/api/v1/note/get-notes");
  return res.json();
}

export default function GetNoteBook() {
  const { data, status, error } = useQuery("getUsersNotebooks", notebooks);

  return (
    <div>
      <Link href="/notebook/new">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          New NoteBook
        </button>
      </Link>

      {status === "success" && (
        <div>
          {data.notebooks.map((book) => (
            <div className="p-4 space-x-4">
              <span>{book.title}</span>
              <Link href={`/notebook/${book.id}`}>
                <button>View</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
