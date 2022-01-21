import Link from "next/link";
import { useQuery } from "react-query";

async function notebooks() {
  const res = await fetch("/api/v1/note/get-notes");
  return res.json();
}

export default function GetNoteBook() {
  const { data, status, error } = useQuery("getUsersNotebooks", notebooks);

  console.log(data);

  return (
    <div>
      <Link href="/notebook/new">
        <button>New</button>
      </Link>

      {status === 'success' && (
          <div>
              {data.notebooks.map((book) => (
                  <div className="p-4 space-x-4">
                      <span>{book.title}</span>
                      <Link href={`/notebook/${book.id}`}>
                      <button >View</button>
                      </Link>
                  </div>
              ))}

        </div>
      )}
    </div>
  );
}
