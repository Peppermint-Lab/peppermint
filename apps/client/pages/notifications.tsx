import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import moment from "moment";
import Link from "next/link";
import { useUser } from "../store/session";

export default function Tickets() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");

  const { user, fetchUserProfile } = useUser();

  async function markasread(id) {
    await fetch(`/api/v1/user/notifcation/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    await fetchUserProfile();
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className="py-2 px-6 flex flex-row items-center justify-between bg-gray-200 dark:bg-[#0A090C] border-b-[1px]">
          <span className="text-sm font-bold">
            You have {user.notifcations.filter((e) => !e.read).length} unread
            notifcations
            {user.notifcations.length > 1 ? "'s" : ""}
          </span>
        </div>
        {user.notifcations.filter((e) => !e.read).length > 0 ? (
          user.notifcations
            .filter((e) => !e.read)
            .map((item) => {
              return (
                <Link href={`/ticket/${item.ticketId}`}>
                  <div className="flex flex-row w-full bg-white dark:bg-[#0A090C] dark:hover:bg-green-600 border-b-[1px] p-2 justify-between px-6 hover:bg-gray-100">
                    <div className="flex flex-row space-x-2 items-center">
                      <span className="text-xs font-semibold">{item.text}</span>
                    </div>
                    <div className="flex flex-row space-x-3 items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          markasread(item.id);
                        }}
                        className="inline-flex z-10 items-center px-2.5 py-1.5 border font-semibold border-gray-300 shadow-sm text-xs rounded text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        mark as read
                      </button>
                      <span className="text-xs">
                        {moment(item.createdAt).format("DD/MM/yyyy")}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <span className="block text-sm font-semibold text-gray-900">
              You have no notifcations
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
