import dynamic from "next/dynamic";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
 
const Editor = dynamic(() => import("../../components/TicketDetails"), { ssr: false });
 
export default function TicketByID() {
  return (
    <div>
      <Editor />
    </div>
  );
}