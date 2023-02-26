import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Loader from "react-spinners/ClipLoader";
import { PlusIcon as PlusIconMini } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

async function fetchNotebooks() {
  const res = await fetch("/api/v1/note/get-notes");
  return res.json();
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NoteBookLayout({ children }) {
  const router = useRouter()
  const { data, status, error } = useQuery("getUsersNotebooks", fetchNotebooks);

  const [notebooks, setNotebooks] = useState();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (data) {
      setNotebooks(data.notebooks);
    }
  }, [data]);

  return (
    <div>
      {status === "loading" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {status === "success" && (
        <div className="">
          <div className="flex flex-row">
            <div className="flex flex-col w-64">
              <div className="flex-row">
                <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
                  <h1 className="text-3xl ml-2 font-bold">
                    Notebooks{" "}
                    <Link
                      className="inline-flex float-right items-center px-4 py-2 text-sm font-medium text-green-600 mt-1"
                      href="/notebook/new"
                    >
                      <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </h1>
                  {notebooks &&
                    notebooks.map((item, index) => (
                      <a
                        key={item.id}
                        href={`/notebook/${item.id}`}
                        className={classNames(
                          router.query.id === item.id
                            ? "bg-green-500 text-white hover:text-white"
                            : "text-gray-900 hover:bg-green-500 hover:text-white hover:bg-opacity-75",
                          "group flex text-left px-2 py-2 w-full text-sm font-medium rounded-md "
                        )}
                      >
                        <span className="flex-1">{item.title}</span>
                      </a>
                    ))}
                </nav>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-[80vh] px-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
