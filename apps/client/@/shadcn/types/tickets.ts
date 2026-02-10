export type ViewMode = 'list' | 'kanban';
export type KanbanGrouping = 'status' | 'priority' | 'type' | 'assignee';
export type SortOption = 'newest' | 'oldest' | 'priority' | 'title';

export type Team = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export type Ticket = {
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

export type KanbanColumn = {
  id: string;
  title: string;
  color: string;
  tickets: Ticket[];
};

export interface UISettings {
  showAvatars: boolean;
  showDates: boolean;
  showPriority: boolean;
  showType: boolean;
  showTicketNumbers: boolean;
} 