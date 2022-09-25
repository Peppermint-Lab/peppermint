import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";



export default function ViewNoteBook() {
  const router = useRouter();

  async function getMarkdown() {
    const res = await fetch(`/api/v1/note/${router.query.id}`);
    return res.json();
  }

  const { data, status, error } = useQuery("viewMarkdown", getMarkdown);

  return (
    <div>
      {status === "success" && (
        <>
          <Link href={`/notebook/${data.data.id}/edit`}>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Edit
            </button>
          </Link>

          <div className="mt-4">
           
          </div>
        </>
      )}
    </div>
  );
}
