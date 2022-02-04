import Link from "next/link";
import { useQuery } from "react-query";
import moment from "moment";
import Loader from "react-spinners/ClipLoader";

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

      {status === "loading" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {status === "success" && (
        <div className="mt-4">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.notebooks.map((book) => (
              <li
                key={book.id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {book.title}
                      </h3>
                      {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {book.createdAt}
                      </span> */}
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      <span>
                        createdAt: {moment(book.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </p>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      <span>
                        updatedAt: {moment(book.updatedAt).format("DD/MM/YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a
                        href={`/notebook/${book.id}/edit`}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        {/* <MailIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        /> */}
                        <span className="ml-3">edit</span>
                      </a>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                      <a
                        href={`/notebook/${book.id}`}
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        {/* <PhoneIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        /> */}
                        <span className="ml-3">View</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
