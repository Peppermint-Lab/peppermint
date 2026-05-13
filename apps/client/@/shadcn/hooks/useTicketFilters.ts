import { Ticket } from '@/shadcn/types/tickets';
import { useEffect, useState } from 'react';

function readStoredList(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(key);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

export function useTicketFilters(tickets: Ticket[] = []) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPriorities(readStoredList("all_selectedPriorities"));
    setSelectedStatuses(readStoredList("all_selectedStatuses"));
    setSelectedAssignees(readStoredList("all_selectedAssignees"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
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

  const clearFilters = () => {
    setSelectedPriorities([]);
    setSelectedStatuses([]);
    setSelectedAssignees([]);
  };

  const filteredTickets = tickets.filter((ticket) => {
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
  });

  return {
    selectedPriorities,
    selectedStatuses,
    selectedAssignees,
    handlePriorityToggle,
    handleStatusToggle,
    handleAssigneeToggle,
    clearFilters,
    filteredTickets
  };
}
