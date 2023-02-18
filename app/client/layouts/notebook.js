import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Loader from "react-spinners/ClipLoader";
import ViewNoteBook from "../components/NotebookEdit";

async function fetchNotebooks() {
  const res = await fetch("/api/v1/note/get-notes");
  return res.json();
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NoteBookLayout() {
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
        <div className="mt-8">
          <div className="flex flex-row">
            <div className="flex flex-col w-64">
              <div className="flex">
                <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
                  <h1 className="text-3xl font-bold">Notebooks</h1>
                  {notebooks &&
                    notebooks.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setSelected(index)}
                        className={classNames(
                          index === selected
                            ? "bg-green-500 text-white"
                            : "text-indigo-100 hover:bg-green-600 hover:bg-opacity-75",
                          "group flex text-left px-2 py-2 w-full text-sm font-medium rounded-md"
                        )}
                      >
                        <span className="flex-1">{item.title}</span>
                      </button>
                    ))}
                </nav>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-[80vh] px-4">
                {notebooks !== undefined && <ViewNoteBook data={notebooks[selected]} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
