import { Switch } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useUser } from "../../store/session";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserNotifications() {
  const { user } = useUser();
  const token = getCookie("session");

  const [ticket_creation, setTicket_creation] = useState(user.ticket_created);
  const [ticket_status, setTicket_status] = useState(
    user.ticket_status_changed
  );
  const [ticket_assigned, setTicket_assigned] = useState(user.ticket_assigned);
  const [ticket_comments, setTicket_comments] = useState(user.ticket_comments);

  async function updateNotifications() {
    await fetch(`/api/v1/auth/profile/notifcations/emails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        notify_ticket_created: ticket_creation,
        notify_ticket_assigned: ticket_assigned,
        notify_ticket_status_changed: ticket_status,
        notify_ticket_comments: ticket_comments,
      }),
    });
  }

  return (
    <div>
      <main className="relative">
        <div className="mt-4">
          <div className="m-2 space-y-4 p-4 ">
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
              <div className="space-y-4">
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Ticket Creation
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      Get emailed when a new ticket is created
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={ticket_creation}
                    onChange={setTicket_creation}
                    className={classNames(
                      ticket_creation ? "bg-teal-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        ticket_creation ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </Switch.Group>

                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Ticket Status Change
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      Get emailed when a ticket you're assigned to has it's
                      status changed
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={ticket_status}
                    onChange={setTicket_status}
                    className={classNames(
                      ticket_status ? "bg-teal-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        ticket_status ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </Switch.Group>

                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Assgined new ticket
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      Get emailed when you get assigned a new ticket
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={ticket_assigned}
                    onChange={setTicket_assigned}
                    className={classNames(
                      ticket_assigned ? "bg-teal-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        ticket_assigned ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </Switch.Group>

                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Ticket Comment
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      Get emailed when a comment is added to your ticket
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={ticket_comments}
                    onChange={setTicket_comments}
                    className={classNames(
                      ticket_comments ? "bg-teal-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        ticket_comments ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>

              <div className="my-4 float-right">
                <button
                  onClick={() => updateNotifications()}
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
