import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/shadcn/ui/context-menu';
import moment from 'moment';
import Link from 'next/link';
import { Ticket, UISettings } from '../../types/tickets';

interface TicketListProps {
  tickets: Ticket[];
  onStatusChange: (ticket: Ticket) => void;
  onAssigneeChange: (ticketId: string, userId?: string) => void;
  onPriorityChange: (ticket: Ticket, priority: string) => void;
  onDelete?: (ticketId: string) => void;
  users: any[];
  currentUser: any;
  uiSettings: UISettings;
}

export default function TicketList({
  tickets,
  onStatusChange,
  onAssigneeChange,
  onPriorityChange,
  onDelete,
  users,
  currentUser,
  uiSettings
}: TicketListProps) {
  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div className="flex-1 overflow-y-auto">
      {tickets.map((ticket) => {
        let p = ticket.priority;
        let badge = p === "Low" ? low : p === "Normal" ? normal : high;

        return (
          <ContextMenu key={ticket.id}>
            <ContextMenuTrigger>
              <Link href={`/issue/${ticket.id}`}>
                <div className="flex flex-row w-full bg-white dark:bg-[#0A090C] dark:hover:bg-green-600 border-b-[1px] p-1.5 justify-between px-6 hover:bg-gray-100">
                  <div className="flex flex-row items-center space-x-4">
                    {uiSettings.showTicketNumbers && (
                      <span className="text-xs font-semibold">#{ticket.Number}</span>
                    )}
                    <span className="text-xs font-semibold">{ticket.title}</span>
                  </div>
                  <div className="flex flex-row space-x-3 items-center">
                    {uiSettings.showDates && (
                      <span className="text-xs">
                        {moment(ticket.createdAt).format("DD/MM/yyyy")}
                      </span>
                    )}
                    {uiSettings.showType && (
                      <span className={`inline-flex items-center rounded-md px-2 py-1 capitalize justify-center w-20 text-xs font-medium ring-1 ring-inset ring-gray-500/10 bg-orange-400 text-white`}>
                        {ticket.type}
                      </span>
                    )}
                    {uiSettings.showPriority && (
                      <span className={`inline-flex items-center rounded-md px-2 py-1 capitalize justify-center w-20 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${badge}`}>
                        {ticket.priority}
                      </span>
                    )}
                    {uiSettings.showAvatars && ticket.assignedTo && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-[11px] font-medium leading-none text-white uppercase">
                          {ticket.assignedTo.name[0]}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => onStatusChange(ticket)}>
                {ticket.isComplete ? "Re-open Issue" : "Close Issue"}
              </ContextMenuItem>
              <ContextMenuSeparator />
            </ContextMenuContent>
          </ContextMenu>
        );
      })}
    </div>
  );
} 