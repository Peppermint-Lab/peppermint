import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ViewNoteBook from "../../components/NotebookEdit";

export default function Notebooks() {
  const router = useRouter();

  const [notebook, setNoteBook] = useState();

  async function fetchNotebook() {
    const res = await fetch(`/api/v1/note/${router.query.id}`).then((res) =>
      res.json()
    );
    setNoteBook(res.data);
  }

  useEffect(() => {
    fetchNotebook();
  }, [router]);

  return <>{notebook !== undefined && <ViewNoteBook data={notebook} />}</>;
}
