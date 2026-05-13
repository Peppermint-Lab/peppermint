import { KanbanGrouping, SortOption, Ticket, UISettings, ViewMode } from '@/shadcn/types/tickets';
import { useEffect, useState } from 'react';

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const saved = window.localStorage.getItem(key);
  if (!saved) {
    return fallback;
  }

  if (typeof fallback === "string") {
    return saved as T;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return fallback;
  }
}

export function useTicketView(tickets: Ticket[] = []) {
  const [viewMode, setViewMode] = useState<ViewMode>(() =>
    readStoredValue<ViewMode>("preferred_view_mode", "list")
  );

  const [kanbanGrouping, setKanbanGrouping] = useState<KanbanGrouping>(() =>
    readStoredValue<KanbanGrouping>("preferred_kanban_grouping", "status")
  );

  const [sortBy, setSortBy] = useState<SortOption>(() =>
    readStoredValue<SortOption>("preferred_sort_by", "newest")
  );

  const [uiSettings, setUISettings] = useState<UISettings>(() =>
    readStoredValue<UISettings>("preferred_ui_settings", {
      showAvatars: true,
      showDates: true,
      showPriority: true,
      showType: true,
      showTicketNumbers: true,
    })
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("preferred_view_mode", viewMode);
    window.localStorage.setItem("preferred_kanban_grouping", kanbanGrouping);
    window.localStorage.setItem("preferred_sort_by", sortBy);
    window.localStorage.setItem("preferred_ui_settings", JSON.stringify(uiSettings));
  }, [viewMode, kanbanGrouping, sortBy, uiSettings]);

  const handleUISettingChange = (setting: keyof UISettings, value: boolean) => {
    setUISettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'priority':
        const priorityOrder = { high: 0, normal: 1, low: 2 };
        return priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()];
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const kanbanColumns = (() => {
    switch (kanbanGrouping) {
      case 'status':
        return [
          {
            id: 'needs_support',
            title: 'Needs Support',
            color: 'bg-yellow-500',
            tickets: sortedTickets.filter(t => t.status === 'needs_support'),
          },
          {
            id: 'in_progress',
            title: 'In Progress',
            color: 'bg-blue-500',
            tickets: sortedTickets.filter(t => t.status === 'in_progress'),
          },
          {
            id: 'in_review',
            title: 'In Review',
            color: 'bg-purple-500',
            tickets: sortedTickets.filter(t => t.status === 'in_review'),
          },
          {
            id: 'hold',
            title: 'On Hold',
            color: 'bg-orange-500',
            tickets: sortedTickets.filter(t => t.status === 'hold'),
          },
          {
            id: 'done',
            title: 'Done',
            color: 'bg-green-500',
            tickets: sortedTickets.filter(t => t.status === 'done'),
          },
        ];
      case 'priority':
        return [
          {
            id: 'high',
            title: 'High',
            color: 'bg-red-500',
            tickets: sortedTickets.filter(t => t.priority.toLowerCase() === 'high'),
          },
          {
            id: 'normal',
            title: 'Normal',
            color: 'bg-green-500',
            tickets: sortedTickets.filter(t => t.priority.toLowerCase() === 'normal'),
          },
          {
            id: 'low',
            title: 'Low',
            color: 'bg-blue-500',
            tickets: sortedTickets.filter(t => t.priority.toLowerCase() === 'low'),
          },
        ];
      case 'type':
        return [
          {
            id: 'bug',
            title: 'Bug',
            color: 'bg-red-500',
            tickets: sortedTickets.filter(t => t.type === 'bug'),
          },
          {
            id: 'feature',
            title: 'Feature',
            color: 'bg-blue-500',
            tickets: sortedTickets.filter(t => t.type === 'feature'),
          },
          // Add other type columns as needed
        ];
      case 'assignee':
        const assignees = Array.from(new Set(sortedTickets.map(t => t.assignedTo?.name || 'Unassigned')));
        return assignees.map(assignee => ({
          id: assignee.toLowerCase(),
          title: assignee,
          color: 'bg-teal-500',
          tickets: sortedTickets.filter(t => (t.assignedTo?.name || 'Unassigned') === assignee),
        }));
      default:
        return [];
    }
  })();

  return {
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
  };
}
