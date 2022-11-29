import Link from "next/link";
import { useQuery } from "react-query";
import Loader from "react-spinners/ClipLoader";
import ViewNoteBook from "../components/NotebookEdit";

async function notebooks() {
  const res = await fetch("/api/v1/note/get-notes");
  return res.json();
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [{ name: "Dashboard", href: "", current: true }];

export default function NoteBookLayout({ children }) {
  const { data, status, error } = useQuery("getUsersNotebooks", notebooks);

  return (
    <div>
      {/* <Link href="/notebook/new">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          New NoteBook
        </button>
      </Link> */}

      {status === "loading" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {status === "success" && (
        <div className="mt-8">
          <div className="flex flex-row">
            <div className="flex flex-col w-64">
              <div className="flex">
                <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
                  <h1 className="text-3xl font-bold">Notebooks</h1>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-green-500 text-white"
                          : "text-indigo-100 hover:bg-green-600 hover:bg-opacity-75",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <span className="flex-1">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-[80vh]">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
