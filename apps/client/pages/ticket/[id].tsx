import dynamic from "next/dynamic";
 
const Editor = dynamic(() => import("../../components/TicketDetails"), { ssr: false });
 
export default function TicketByID() {
  return (
    <div>
      <Editor />
    </div>
  );
}