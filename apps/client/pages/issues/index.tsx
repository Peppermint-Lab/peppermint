import TicketFilters from "@/shadcn/components/tickets/TicketFilters";
import TicketKanban from "@/shadcn/components/tickets/TicketKanban";
import TicketList from "@/shadcn/components/tickets/TicketList";
import ViewSettings from "@/shadcn/components/tickets/ViewSettings";
import { useTicketActions } from "@/shadcn/hooks/useTicketActions";
import { useTicketFilters } from "@/shadcn/hooks/useTicketFilters";
import { useTicketView } from "@/shadcn/hooks/useTicketView";
import { getCookie } from "cookies-next";
import { Loader } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useUser } from "../../store/session";

async function getUserTickets(token: any) {
  const res = await fetch(`/api/v1/tickets/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default function Tickets() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");
  const user = useUser();
  const [isMounted, setIsMounted] = useState(false);
  
  // Fetch tickets data
  const { data, status, refetch } = useQuery(
    "allusertickets",
    () => getUserTickets(token),
    {
      refetchInterval: 5000,
    }
  );

  // Custom hooks for managing state
  const {
    selectedPriorities,
    selectedStatuses,
    selectedAssignees,
    handlePriorityToggle,
    handleStatusToggle,
    handleAssigneeToggle,
    clearFilters,
    filteredTickets
  } = useTicketFilters(data?.tickets);

  const {
    viewMode,
    kanbanGrouping,
    sortBy,
    setViewMode,
    setKanbanGrouping,
    setSortBy,
    sortedTickets,
    kanbanColumns,
    uiSettings,
    handleUISettingChange,
  } = useTicketView(filteredTickets);

  const {
    updateTicketStatus,
    updateTicketAssignee,
    updateTicketPriority,
    deleteTicket
  } = useTicketActions(token, refetch);

  // Update local storage when filters change
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      "all_selectedPriorities",
      JSON.stringify(selectedPriorities)
    );
    window.localStorage.setItem(
      "all_selectedStatuses",
      JSON.stringify(selectedStatuses)
    );
    window.localStorage.setItem(
      "all_selectedAssignees",
      JSON.stringify(selectedAssignees)
    );
  }, [selectedPriorities, selectedStatuses, selectedAssignees]);

  const [users, setUsers] = useState<any[]>([]);

  async function fetchUsers() {
    try {
      const response = await fetch(`/api/v1/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch users:", response.status);
        return;
      }

      const res = await response.json();
      if (res && res.users) {
        setUsers(res.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add this to the useEffect that saves preferences
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("preferred_view_mode", viewMode);
    window.localStorage.setItem("preferred_kanban_grouping", kanbanGrouping);
    window.localStorage.setItem("preferred_sort_by", sortBy);
  }, [viewMode, kanbanGrouping, sortBy]);

  if (status === "loading") {
    return <Loader className="animate-spin" />;
  }

  if (status === "error") {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p className="text-red-500">Error loading tickets. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="py-2 px-3 bg-background border-b-[1px] flex flex-row items-center justify-between">
        <TicketFilters
          selectedPriorities={selectedPriorities}
          selectedStatuses={selectedStatuses}
          selectedAssignees={selectedAssignees}
          users={users}
          onPriorityToggle={handlePriorityToggle}
          onStatusToggle={handleStatusToggle}
          onAssigneeToggle={handleAssigneeToggle}
          onClearFilters={clearFilters}
        />
        
        <ViewSettings
          viewMode={viewMode}
          kanbanGrouping={kanbanGrouping}
          sortBy={sortBy}
          uiSettings={uiSettings}
          onViewModeChange={setViewMode}
          onKanbanGroupingChange={setKanbanGrouping}
          onSortChange={setSortBy}
          onUISettingChange={handleUISettingChange}
        />
      </div>

      {viewMode === "list" ? (
        <TicketList
          tickets={sortedTickets}
          onStatusChange={updateTicketStatus}
          onAssigneeChange={updateTicketAssignee}
          onPriorityChange={updateTicketPriority}
          onDelete={user?.isAdmin ? deleteTicket : undefined}
          users={users}
          currentUser={user}
          uiSettings={uiSettings}
        />
      ) : (
        <TicketKanban 
          columns={kanbanColumns} 
          uiSettings={uiSettings}
        />
      )}
    </div>
  );
}
