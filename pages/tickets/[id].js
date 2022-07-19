import { useQuery } from "react-query";
import TicketDetail from "../../components/TicketDetail";
import { useRouter } from "next/router";

export default function Ticket() {
  const router = useRouter();

  const fetchTicketById = async () => {
    const id = router.query.id;
    const res = await fetch(`/api/v1/ticket/${id}`);
    return res.json();
  };

  const { data, status } = useQuery("fetchTickets", fetchTicketById);

  return (
    <div>
      {status === "loading" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2> Loading data ... </h2>
          {/* <Spin /> */}
        </div>
      )}

      {status === "error" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold"> Error fetching data ... </h2>
          {/* <img src={server} className="h-96 w-96" alt="error" /> */}
        </div>
      )}

      {status === "success" && (
        <div>
          <TicketDetail ticket={data.tickets} />
        </div>
      )}
    </div>
  );
}
