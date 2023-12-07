import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Loader from "react-spinners/ClipLoader";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useQuery } from "react-query";
import { useUser } from "../../store/session";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

async function getUserTickets(token: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets/open`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
}

export default function Tickets() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");
  const { data, status, error } = useQuery("allusertickets", () =>
    getUserTickets(token)
  );

  const user = useUser();

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div>
      {status === "loading" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {status === "success" && (
        <div>
          <div className="flex flex-col">
            <div className="p-2 ml-4">
              <span className="text-sm font-bold">All Tickets</span>
            </div>
            {data.tickets.map((ticket) => {
              let p = ticket.priority;
              let badge;

              if (p === "Low") {
                badge = low;
              }
              if (p === "Normal") {
                badge = normal;
              }
              if (p === "High") {
                badge = high;
              }

              return (
                <Link href={`/ticket/${ticket.id}`}>
                  <div className="flex flex-row w-full bg-white border-b-[1px] p-3 justify-between px-6 hover:bg-gray-100">
                    <div>
                      <span className="text-xs font-semibold">
                        {ticket.title}
                      </span>
                    </div>
                    <div className="flex flex-row space-x-3 items-center">
                      <span
                        className={`inline-flex items-center rounded-md px-2 justify-center w-16 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${badge}`}
                      >
                        {ticket.priority}
                      </span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-[11px] font-medium leading-none text-white uppercase">
                          {ticket.assignedTo ? ticket.assignedTo.name[0] : ""}
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
