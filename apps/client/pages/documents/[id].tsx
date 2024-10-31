import dynamic from "next/dynamic";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const Editor = dynamic(() => import("../../components/NotebookEditor"), {
  ssr: false,
});

export default function Notebooks() {

  return (
    <>
      <Editor />
    </>
  );
}
