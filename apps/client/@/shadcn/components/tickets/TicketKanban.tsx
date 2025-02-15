import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import Link from 'next/link';
import { KanbanColumn } from '../../types/tickets';

interface TicketKanbanProps {
  columns: KanbanColumn[];
}

export default function TicketKanban({ columns }: TicketKanbanProps) {
  return (
    <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex-shrink-0 w-[350px] bg-gray-50 dark:bg-gray-800/50 rounded-lg flex flex-col max-h-full"
          >
            <div className="p-3 border-b dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${column.color}`} />
                <span className="font-medium text-sm">{column.title}</span>
                <span className="text-gray-500 text-xs">
                  ({column.tickets.length})
                </span>
              </div>
            </div>
            <div className="p-2 space-y-2 overflow-y-auto flex-grow [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {column.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  ref={(element) => {
                    if (!element) return;
                    draggable({
                      element,
                      dragHandle: element,
                      data: { ticketId: ticket.id } as const,
                    });
                  }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700 p-3 cursor-move hover:shadow-md transition-shadow"
                >
                  {/* Ticket card content */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-gray-500">#{ticket.Number}</span>
                      <Link 
                        href={`/issue/${ticket.id}`}
                        className="text-sm font-medium hover:underline line-clamp-1"
                      >
                        {ticket.title}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 