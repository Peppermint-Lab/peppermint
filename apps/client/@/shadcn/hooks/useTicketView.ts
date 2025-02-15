import { KanbanGrouping, SortOption, Ticket, UISettings, ViewMode } from '@/shadcn/types/tickets';
import { useEffect, useState } from 'react';

export function useTicketView(tickets: Ticket[] = []) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem("preferred_view_mode");
    return (saved as ViewMode) || 'list';
  });

  const [kanbanGrouping, setKanbanGrouping] = useState<KanbanGrouping>(() => {
    const saved = localStorage.getItem("preferred_kanban_grouping");
    return (saved as KanbanGrouping) || 'status';
  });

  const [sortBy, setSortBy] = useState<SortOption>(() => {
    const saved = localStorage.getItem("preferred_sort_by");
    return (saved as SortOption) || 'newest';
  });

  const [uiSettings, setUISettings] = useState<UISettings>(() => {
    const saved = localStorage.getItem("preferred_ui_settings");
    return saved ? JSON.parse(saved) : {
      showAvatars: true,
      showDates: true,
      showPriority: true,
      showType: true,
      showTicketNumbers: true,
    };
  });

  useEffect(() => {
    localStorage.setItem("preferred_view_mode", viewMode);
    localStorage.setItem("preferred_kanban_grouping", kanbanGrouping);
    localStorage.setItem("preferred_sort_by", sortBy);
    localStorage.setItem("preferred_ui_settings", JSON.stringify(uiSettings));
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
