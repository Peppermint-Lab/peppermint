import { toast } from "@/shadcn/hooks/use-toast";
import { cn } from "@/shadcn/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shadcn/ui/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/shadcn/ui/context-menu';
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import {
  draggable
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { getCookie } from "cookies-next";
import { CheckIcon, Filter, Settings, X } from "lucide-react";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Loader from "react-spinners/ClipLoader";
import { useUser } from "../../store/session";

// Add these types near the top
type Team = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
};

type Ticket = {
  id: string;
  Number: number;
  title: string;
  priority: string;
  type: string;
  status: string;
  createdAt: string;
  team?: Team;
  assignedTo?: User;
  isComplete: boolean;
};

type KanbanColumn = {
  id: string;
  title: string;
  color: string;
  tickets: Ticket[];
};

// Add this type near the top with the other types
type SortOption = "newest" | "oldest" | "priority" | "title";

async function getUserTickets(token: any) {
  const res = await fetch(`/api/v1/tickets/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

const FilterBadge = ({
  text,
  onRemove,
}: {
  text: string;
  onRemove: () => void;
}) => (
  <div className="flex items-center gap-1 bg-accent rounded-md px-2 py-1 text-xs">
    <span>{text}</span>
    <button
      onClick={(e) => {
        e.preventDefault();
        onRemove();
      }}
      className="hover:bg-muted rounded-full p-0.5"
    >
      <X className="h-3 w-3" />
    </button>
  </div>
);

type ViewMode = "list" | "kanban";
type KanbanGrouping = "status" | "priority" | "type" | "assignee";

export default function Tickets() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");
  const { data, status, error, refetch } = useQuery(
    "allusertickets",
    () => getUserTickets(token),
    {
      refetchInterval: 5000,
    }
  );

  const user = useUser();

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(() => {
    const saved = localStorage.getItem("all_selectedPriorities");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(() => {
    const saved = localStorage.getItem("all_selectedStatuses");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(() => {
    const saved = localStorage.getItem("all_selectedAssignees");
    return saved ? JSON.parse(saved) : [];
  });

  // Update local storage when filters change
  useEffect(() => {
    localStorage.setItem(
      "all_selectedPriorities",
      JSON.stringify(selectedPriorities)
    );
    localStorage.setItem(
      "all_selectedStatuses",
      JSON.stringify(selectedStatuses)
    );
    localStorage.setItem(
      "all_selectedAssignees",
      JSON.stringify(selectedAssignees)
    );
  }, [selectedPriorities, selectedStatuses, selectedAssignees]);

  const [users, setUsers] = useState<any[]>([]);

  const handlePriorityToggle = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleAssigneeToggle = (assignee: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(assignee)
        ? prev.filter((a) => a !== assignee)
        : [...prev, assignee]
    );
  };

  const filteredTickets = data
    ? data.tickets.filter((ticket) => {
        const priorityMatch =
          selectedPriorities.length === 0 ||
          selectedPriorities.includes(ticket.priority);
        const statusMatch =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(ticket.isComplete ? "closed" : "open");
        const assigneeMatch =
          selectedAssignees.length === 0 ||
          selectedAssignees.includes(ticket.assignedTo?.name || "Unassigned");

        return priorityMatch && statusMatch && assigneeMatch;
      })
    : [];

  type FilterType = "priority" | "status" | "assignee" | null;
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [filterSearch, setFilterSearch] = useState("");

  const filteredPriorities = useMemo(() => {
    const priorities = ["low", "medium", "high"];
    return priorities.filter((priority) =>
      priority.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }, [filterSearch]);

  const filteredStatuses = useMemo(() => {
    const statuses = ["open", "closed"];
    return statuses.filter((status) =>
      status.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }, [filterSearch]);

  const filteredAssignees = useMemo(() => {
    const assignees = data?.tickets
      .map((t) => t.assignedTo?.name || "Unassigned")
      .filter((name, index, self) => self.indexOf(name) === index);
    return assignees?.filter((assignee) =>
      assignee.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }, [data?.tickets, filterSearch]);

  async function fetchUsers() {
    await fetch(`/api/v1/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUsers(res.users);
        }
      });
  }

  async function updateTicketStatus(e: any, ticket: any) {
    await fetch(`/api/v1/ticket/status/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: ticket.id, status: !ticket.isComplete }),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: ticket.isComplete ? "Issue re-opened" : "Issue closed",
          description: "The status of the issue has been updated.",
          duration: 3000,
        });
        refetch();
      });
  }

  // Add these new functions
  async function updateTicketAssignee(ticketId: string, user: any) {
    try {
      const response = await fetch(`/api/v1/ticket/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user ? user.id : undefined,
          id: ticketId,
        }),
      });

      if (!response.ok) throw new Error("Failed to update assignee");

      toast({
        title: "Assignee updated",
        description: `Transferred issue successfully`,
        duration: 3000,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update assignee",
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  async function updateTicketPriority(ticket: any, priority: string) {
    try {
      const response = await fetch(`/api/v1/ticket/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: ticket.id,
          detail: ticket.detail,
          note: ticket.note,
          title: ticket.title,
          priority: priority,
          status: ticket.status,
        }),
      }).then((res) => res.json());

      if (!response.success) throw new Error("Failed to update priority");

      toast({
        title: "Priority updated",
        description: `Ticket priority set to ${priority}`,
        duration: 3000,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update priority",
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem("preferred_view_mode");
    return (saved as ViewMode) || "list";
  });

  const [kanbanGrouping, setKanbanGrouping] = useState<KanbanGrouping>(() => {
    const saved = localStorage.getItem("preferred_kanban_grouping");
    return (saved as KanbanGrouping) || "status";
  });

  // Add these state variables after the other useState declarations
  const [sortBy, setSortBy] = useState<SortOption>(() => {
    const saved = localStorage.getItem("preferred_sort_by");
    return (saved as SortOption) || "newest";
  });

  // Add this to the useEffect that saves preferences
  useEffect(() => {
    localStorage.setItem("preferred_view_mode", viewMode);
    localStorage.setItem("preferred_kanban_grouping", kanbanGrouping);
    localStorage.setItem("preferred_sort_by", sortBy);
  }, [viewMode, kanbanGrouping, sortBy]);

  const getKanbanColumns = (): KanbanColumn[] => {
    switch (kanbanGrouping) {
      case "status":
        return [
          {
            id: "needs_support",
            title: "Needs Support",
            color: "bg-yellow-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.status === "needs_support"
            ),
          },
          {
            id: "in_progress",
            title: "In Progress",
            color: "bg-blue-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.status === "in_progress"
            ),
          },
          {
            id: "in_review",
            title: "In Review",
            color: "bg-purple-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.status === "in_review"
            ),
          },
          {
            id: "hold",
            title: "On Hold",
            color: "bg-orange-500",
            tickets: sortedFilteredTickets.filter((t) => t.status === "hold"),
          },
          {
            id: "done",
            title: "Done",
            color: "bg-green-500",
            tickets: sortedFilteredTickets.filter((t) => t.status === "done"),
          },
        ];

      case "type":
        return [
          {
            id: "bug",
            title: "Bug",
            color: "bg-red-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "bug"),
          },
          {
            id: "feature",
            title: "Feature",
            color: "bg-blue-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "feature"),
          },
          {
            id: "support",
            title: "Support",
            color: "bg-green-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "support"),
          },
          {
            id: "incident",
            title: "Incident",
            color: "bg-yellow-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "incident"),
          },
          {
            id: "service",
            title: "Service",
            color: "bg-purple-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "service"),
          },
          {
            id: "maintenance",
            title: "Maintenance",
            color: "bg-gray-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.type === "maintenance"
            ),
          },
          {
            id: "access",
            title: "Access",
            color: "bg-indigo-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "access"),
          },
          {
            id: "feedback",
            title: "Feedback",
            color: "bg-pink-500",
            tickets: sortedFilteredTickets.filter((t) => t.type === "feedback"),
          },
        ];

      case "priority":
        return [
          {
            id: "high",
            title: "High",
            color: "bg-red-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.priority.toLowerCase() === "high"
            ),
          },
          {
            id: "normal",
            title: "Normal",
            color: "bg-green-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.priority.toLowerCase() === "normal"
            ),
          },
          {
            id: "low",
            title: "Low",
            color: "bg-blue-500",
            tickets: sortedFilteredTickets.filter(
              (t) => t.priority.toLowerCase() === "low"
            ),
          },
        ];

      case "assignee":
        const assignees = Array.from(
          new Set(
            sortedFilteredTickets.map((t) => t.assignedTo?.name || "Unassigned")
          )
        ) as string[];
        return assignees.map((assignee) => ({
          id: assignee.toLowerCase(),
          title: assignee,
          color: "bg-teal-500",
          tickets: sortedFilteredTickets.filter(
            (t) => (t.assignedTo?.name || "Unassigned") === assignee
          ),
        }));

      default:
        return [];
    }
  };

  // Add this sorting function before the return statement
  const getSortedTickets = (tickets: Ticket[]) => {
    return [...tickets].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "priority":
          const priorityOrder = { high: 0, normal: 1, low: 2 };
          return (
            priorityOrder[a.priority.toLowerCase()] -
            priorityOrder[b.priority.toLowerCase()]
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  // Update the filteredTickets to use sorting
  const sortedFilteredTickets = getSortedTickets(filteredTickets);

  return (
    <div>
      {status === "loading" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {status === "success" && (
        <div>
          <div className="flex flex-col h-screen">
            <div className="py-2 px-3 bg-background border-b-[1px] flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 bg-transparent"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      <span className="hidden sm:block">Filters</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    {!activeFilter ? (
                      <Command>
                        <CommandInput placeholder="Search filters..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => setActiveFilter("priority")}
                            >
                              Priority
                            </CommandItem>
                            <CommandItem
                              onSelect={() => setActiveFilter("status")}
                            >
                              Status
                            </CommandItem>
                            <CommandItem
                              onSelect={() => setActiveFilter("assignee")}
                            >
                              Assigned To
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    ) : activeFilter === "priority" ? (
                      <Command>
                        <CommandInput
                          placeholder="Search priority..."
                          value={filterSearch}
                          onValueChange={setFilterSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No priorities found.</CommandEmpty>
                          <CommandGroup heading="Priority">
                            {filteredPriorities.map((priority) => (
                              <CommandItem
                                key={priority}
                                onSelect={() => handlePriorityToggle(priority)}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    selectedPriorities.includes(priority)
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible"
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span className="capitalize">{priority}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setActiveFilter(null);
                                setFilterSearch("");
                              }}
                              className="justify-center text-center"
                            >
                              Back to filters
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    ) : activeFilter === "status" ? (
                      <Command>
                        <CommandInput
                          placeholder="Search status..."
                          value={filterSearch}
                          onValueChange={setFilterSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No statuses found.</CommandEmpty>
                          <CommandGroup heading="Status">
                            {filteredStatuses.map((status) => (
                              <CommandItem
                                key={status}
                                onSelect={() => handleStatusToggle(status)}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    selectedStatuses.includes(status)
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible"
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span className="capitalize">{status}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setActiveFilter(null);
                                setFilterSearch("");
                              }}
                              className="justify-center text-center"
                            >
                              Back to filters
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    ) : activeFilter === "assignee" ? (
                      <Command>
                        <CommandInput
                          placeholder="Search assignee..."
                          value={filterSearch}
                          onValueChange={setFilterSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No assignees found.</CommandEmpty>
                          <CommandGroup heading="Assigned To">
                            {filteredAssignees?.map((name) => (
                              <CommandItem
                                key={name}
                                onSelect={() => handleAssigneeToggle(name)}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    selectedAssignees.includes(name)
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible"
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span>{name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setActiveFilter(null);
                                setFilterSearch("");
                              }}
                              className="justify-center text-center"
                            >
                              Back to filters
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    ) : null}
                  </PopoverContent>
                </Popover>

                {/* Display selected filters */}
                <div className="flex flex-wrap gap-2">
                  {selectedPriorities.map((priority) => (
                    <FilterBadge
                      key={`priority-${priority}`}
                      text={`Priority: ${priority}`}
                      onRemove={() => handlePriorityToggle(priority)}
                    />
                  ))}

                  {selectedStatuses.map((status) => (
                    <FilterBadge
                      key={`status-${status}`}
                      text={`Status: ${status}`}
                      onRemove={() => handleStatusToggle(status)}
                    />
                  ))}

                  {selectedAssignees.map((assignee) => (
                    <FilterBadge
                      key={`assignee-${assignee}`}
                      text={`Assignee: ${assignee}`}
                      onRemove={() => handleAssigneeToggle(assignee)}
                    />
                  ))}

                  {/* Clear all filters button - only show if there are filters */}
                  {(selectedPriorities.length > 0 ||
                    selectedStatuses.length > 0 ||
                    selectedAssignees.length > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => {
                        setSelectedPriorities([]);
                        setSelectedStatuses([]);
                        setSelectedAssignees([]);
                      }}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
              <div>
                {/* Add view toggle button */}
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Settings className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Settings</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-3" align="end">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            View Mode
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={
                                viewMode === "list" ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setViewMode("list")}
                              className="w-full"
                            >
                              List
                            </Button>
                            <Button
                              variant={
                                viewMode === "kanban" ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setViewMode("kanban")}
                              className="w-full"
                            >
                              Kanban
                            </Button>
                          </div>
                        </div>

                        {viewMode === "list" && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Sort By
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              <Button
                                variant={
                                  sortBy === "newest" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSortBy("newest")}
                                className="w-full justify-start"
                              >
                                Newest First
                              </Button>
                              <Button
                                variant={
                                  sortBy === "oldest" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSortBy("oldest")}
                                className="w-full justify-start"
                              >
                                Oldest First
                              </Button>
                              <Button
                                variant={
                                  sortBy === "priority" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSortBy("priority")}
                                className="w-full justify-start"
                              >
                                Priority
                              </Button>
                              <Button
                                variant={
                                  sortBy === "title" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSortBy("title")}
                                className="w-full justify-start"
                              >
                                Title
                              </Button>
                            </div>
                          </div>
                        )}

                        {viewMode === "kanban" && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Group By
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              <Button
                                variant={
                                  kanbanGrouping === "status"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setKanbanGrouping("status")}
                                className="w-full justify-start"
                              >
                                Status
                              </Button>
                              <Button
                                variant={
                                  kanbanGrouping === "priority"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setKanbanGrouping("priority")}
                                className="w-full justify-start"
                              >
                                Priority
                              </Button>
                              <Button
                                variant={
                                  kanbanGrouping === "type"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setKanbanGrouping("type")}
                                className="w-full justify-start"
                              >
                                Type
                              </Button>

                              <Button
                                variant={
                                  kanbanGrouping === "assignee"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setKanbanGrouping("assignee")}
                                className="w-full justify-start"
                              >
                                Assignee
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {viewMode === "list" ? (
              // List View
              <div className="flex-1 overflow-y-auto">
                {sortedFilteredTickets.map((ticket) => {
                  let p = ticket.priority;
                  let badge;

                  if (p === "Low") {
                    badge = low;
                  }
                  if (p === "Normal") {
                    badge = normal;
                  }
                  if (p === "high") {
                    badge = high;
                  }

                  return (
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Link href={`/issue/${ticket.id}`}>
                          <div className="flex flex-row w-full bg-white dark:bg-[#0A090C] dark:hover:bg-green-600 border-b-[1px] p-1.5 justify-between px-6 hover:bg-gray-100">
                            <div className="flex flex-row items-center space-x-4">
                              <span className="text-xs font-semibold">
                                #{ticket.Number}
                              </span>
                              <span className="text-xs font-semibold">
                                {ticket.title}
                              </span>
                            </div>
                            <div className="flex flex-row space-x-3 items-center">
                              <div>
                                <span className="text-xs">
                                  {moment(ticket.createdAt).format(
                                    "DD/MM/yyyy"
                                  )}
                                </span>
                              </div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-md px-2 py-1 capitalize justify-center w-20 text-xs font-medium ring-1 ring-inset ring-gray-500/10 bg-orange-400 text-white`}
                                >
                                  {ticket.type}
                                </span>
                              </div>
                              <div>
                                {ticket.isComplete === true ? (
                                  <div>
                                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 w-20 justify-center py-1 text-xs ring-1 ring-inset ring-gray-500/10 font-medium text-red-700">
                                      <svg
                                        className="h-1.5 w-1.5 fill-red-500"
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                      {t("closed")}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <span className="inline-flex items-center gap-x-1.5  rounded-md w-20 justify-center font-medium bg-green-100 ring-1 ring-inset ring-gray-500/10 px-2 py-1 text-xs text-green-700">
                                      <svg
                                        className="h-1.5 w-1.5 fill-green-500"
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                      {t("open")}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-md px-2 py-1 capitalize justify-center w-20 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${badge}`}
                                >
                                  {ticket.priority}
                                </span>
                              </div>
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                                <span className="text-[11px] font-medium leading-none text-white uppercase">
                                  {ticket.assignedTo
                                    ? ticket.assignedTo.name[0]
                                    : ""}
                                </span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-52">
                        <ContextMenuItem
                          onClick={(e) => updateTicketStatus(e, ticket)}
                        >
                          {ticket.isComplete ? "Re-open Issue" : "Close Issue"}
                        </ContextMenuItem>
                        <ContextMenuSeparator />

                        <ContextMenuSub>
                          <ContextMenuSubTrigger>
                            Assign To
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-64 ml-1 -mt-1/2">
                            <Command>
                              <CommandList>
                                <CommandGroup heading="Assigned To">
                                  <CommandItem
                                    onSelect={() =>
                                      updateTicketAssignee(ticket.id, undefined)
                                    }
                                  >
                                    <div
                                      className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        ticket.assignedTo?.name === user.name
                                          ? "bg-primary text-primary-foreground"
                                          : "opacity-50 [&_svg]:invisible"
                                      )}
                                    >
                                      <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    <span>Unassigned</span>
                                  </CommandItem>
                                  {users?.map((user) => (
                                    <CommandItem
                                      key={user.id}
                                      onSelect={() =>
                                        updateTicketAssignee(ticket.id, user)
                                      }
                                    >
                                      <div
                                        className={cn(
                                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                          ticket.assignedTo?.name === user.name
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                        )}
                                      >
                                        <CheckIcon className={cn("h-4 w-4")} />
                                      </div>
                                      <span>{user.name}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </ContextMenuSubContent>
                        </ContextMenuSub>

                        <ContextMenuSub>
                          <ContextMenuSubTrigger>
                            Change Priority
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-64 ml-1">
                            <Command>
                              <CommandList>
                                <CommandGroup heading="Priority">
                                  {filteredPriorities.map((priority) => (
                                    <CommandItem
                                      key={priority}
                                      onSelect={() =>
                                        updateTicketPriority(ticket, priority)
                                      }
                                    >
                                      <div
                                        className={cn(
                                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                          ticket.priority.toLowerCase() ===
                                            priority
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                        )}
                                      >
                                        <CheckIcon className={cn("h-4 w-4")} />
                                      </div>
                                      <span className="capitalize">
                                        {priority}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </ContextMenuSubContent>
                        </ContextMenuSub>

                        <ContextMenuSeparator />

                        <ContextMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            toast({
                              title: "Link copied to clipboard",
                              description:
                                "You can now share the link with others.",
                              duration: 3000,
                            });
                            navigator.clipboard.writeText(
                              `${window.location.origin}/issue/${ticket.id}`
                            );
                          }}
                        >
                          Share Link
                        </ContextMenuItem>

                        {user.isAdmin && (
                          <>
                            <ContextMenuSeparator />

                            <ContextMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.preventDefault();
                                if (
                                  confirm(
                                    "Are you sure you want to delete this ticket?"
                                  )
                                ) {
                                  fetch(`/api/v1/ticket/delete`, {
                                    method: "POST",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ id: ticket.id }),
                                  }).then(() => {
                                    refetch();
                                  });
                                }
                              }}
                            >
                              Delete Ticket
                            </ContextMenuItem>
                          </>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>
                  );
                })}
                ) : (
                <div className="min-h-screen flex items-center justify-center">
                  <button
                    type="button"
                    className="relative block w-[400px] rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      const event = new KeyboardEvent("keydown", { key: "c" });
                      document.dispatchEvent(event);
                    }}
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Create your first issue
                    </span>
                  </button>
                </div>
                )
              </div>
            ) : (
              // Kanban View
              <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
                  {getKanbanColumns().map((column) => (
                    <div
                      key={column.id}
                      className="flex-shrink-0 w-[350px] bg-gray-50 dark:bg-gray-800/50 rounded-lg flex flex-col max-h-full"
                    >
                      <div className="p-3 border-b dark:border-gray-700 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${column.color}`}
                          />
                          <span className="font-medium text-sm">
                            {column.title}
                          </span>
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
                            {/* Header: Number, Title and Priority */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs text-gray-500">
                                  #{ticket.Number}
                                </span>
                                <Link
                                  href={`/issue/${ticket.id}`}
                                  className="text-sm font-medium hover:underline line-clamp-1"
                                >
                                  {ticket.title}
                                </Link>
                              </div>
                              <span
                                className={`shrink-0 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                  ticket.priority === "high"
                                    ? high
                                    : ticket.priority === "normal"
                                    ? normal
                                    : low
                                }`}
                              >
                                {ticket.priority}
                              </span>
                            </div>

                            {/* Footer: Type, Date, Assignee */}
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-md px-2 py-1 capitalize text-xs font-medium bg-orange-100 text-orange-800">
                                  {ticket.type}
                                </span>
                                <span className="text-gray-500">
                                  {moment(ticket.createdAt).format(
                                    "DD/MM/yyyy"
                                  )}
                                </span>
                              </div>
                              {ticket.assignedTo && (
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white">
                                  <span className="text-[11px] font-medium leading-none uppercase">
                                    {ticket.assignedTo.name[0]}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
