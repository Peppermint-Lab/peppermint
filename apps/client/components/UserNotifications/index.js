import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserNotifications() {
  const { data: session } = useSession();

  const [ticket_creation, setTicket_creation] = useState();
  const [ticket_status, setTicket_status] = useState();
  const [ticket_assigned, setTicket_assigned] = useState();
  const [loading, setLoading] = useState();

  async function fetchNotificationOptions() {
    await fetch(`/api/v1/users/${session.id}/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((res) => {
        if(res.user) {
          setTicket_creation(res.user.notify_ticket_created)
          setTicket_status(res.user.notify_ticket_status_changed)
          setTicket_assigned(res.user.notify_ticket_assigned)
        }
      })
  }

  async function updateNotifications() {
    await fetch(`/api/v1/users/${session.id}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_creation,
        ticket_assigned,
        ticket_status,
      }),
    }).then(() => fetchNotificationOptions())
  }

  useEffect(() => {
    fetchNotificationOptions()
  }, [])

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <div className="space-y-4">
        <Switch.Group as="div" className="flex items-center justify-between" >
          <span className="flex-grow flex flex-col">
            <Switch.Label
              as="span"
              className="text-sm font-medium text-gray-900"
              passive
            >
              Ticket Creation
            </Switch.Label>
            <Switch.Description as="span" className="text-sm text-gray-500">
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

        <Switch.Group as="div" className="flex items-center justify-between">
          <span className="flex-grow flex flex-col">
            <Switch.Label
              as="span"
              className="text-sm font-medium text-gray-900"
              passive
            >
              Ticket Status Change
            </Switch.Label>
            <Switch.Description as="span" className="text-sm text-gray-500">
              Get emailed when a ticket you're assigned to has it's status
              changed
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

        <Switch.Group as="div" className="flex items-center justify-between">
          <span className="flex-grow flex flex-col">
            <Switch.Label
              as="span"
              className="text-sm font-medium text-gray-900"
              passive
            >
              Assgined new ticket
            </Switch.Label>
            <Switch.Description as="span" className="text-sm text-gray-500">
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
      </div>

      <div className="m-4 float-right">
        <button
          onClick={() => updateNotifications()}
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          save
        </button>
      </div>
    </div>
  );
}
