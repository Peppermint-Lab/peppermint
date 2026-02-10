import { Ticket } from '@/shadcn/types/tickets';
import { useEffect, useState } from 'react';

export function useTicketFilters(tickets: Ticket[] = []) {
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

  useEffect(() => {
    localStorage.setItem("all_selectedPriorities", JSON.stringify(selectedPriorities));
    localStorage.setItem("all_selectedStatuses", JSON.stringify(selectedStatuses));
    localStorage.setItem("all_selectedAssignees", JSON.stringify(selectedAssignees));
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
