import Link from "next/link";

import ViewNoteBook from "../../components/NotebookEdit";
import NoteBookLayout from "../../layouts/notebook";

export default function Notebooks() {
  return (
    <>
      <a
        className="inline-flex mb-12 float-right items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        href="/notebook/new"
      >
        New NoteBook
      </a>

      <NoteBookLayout />
    </>
  );
}
