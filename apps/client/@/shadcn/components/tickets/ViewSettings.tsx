import { Button } from "@/shadcn/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Settings } from "lucide-react";
import { KanbanGrouping, SortOption, ViewMode } from '../../types/tickets';

interface ViewSettingsProps {
  viewMode: ViewMode;
  kanbanGrouping: KanbanGrouping;
  sortBy: SortOption;
  onViewModeChange: (mode: ViewMode) => void;
  onKanbanGroupingChange: (grouping: KanbanGrouping) => void;
  onSortChange: (sort: SortOption) => void;
}

export default function ViewSettings({
  viewMode,
  kanbanGrouping,
  sortBy,
  onViewModeChange,
  onKanbanGroupingChange,
  onSortChange,
}: ViewSettingsProps) {
  return (
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
            <h4 className="text-sm font-medium mb-2">View Mode</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="w-full"
              >
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('kanban')}
                className="w-full"
              >
                Kanban
              </Button>
            </div>
          </div>
          
          {viewMode === 'list' && (
            <div>
              <h4 className="text-sm font-medium mb-2">Sort By</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={sortBy === 'newest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onSortChange('newest')}
                  className="w-full justify-start"
                >
                  Newest First
                </Button>
                <Button
                  variant={sortBy === 'oldest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onSortChange('oldest')}
                  className="w-full justify-start"
                >
                  Oldest First
                </Button>
                <Button
                  variant={sortBy === 'priority' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onSortChange('priority')}
                  className="w-full justify-start"
                >
                  Priority
                </Button>
                <Button
                  variant={sortBy === 'title' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onSortChange('title')}
                  className="w-full justify-start"
                >
                  Title
                </Button>
              </div>
            </div>
          )}
          
          {viewMode === 'kanban' && (
            <div>
              <h4 className="text-sm font-medium mb-2">Group By</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={kanbanGrouping === 'status' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onKanbanGroupingChange('status')}
                  className="w-full justify-start"
                >
                  Status
                </Button>
                <Button
                  variant={kanbanGrouping === 'priority' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onKanbanGroupingChange('priority')}
                  className="w-full justify-start"
                >
                  Priority
                </Button>
                <Button
                  variant={kanbanGrouping === 'type' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onKanbanGroupingChange('type')}
                  className="w-full justify-start"
                >
                  Type
                </Button>
                <Button
                  variant={kanbanGrouping === 'assignee' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onKanbanGroupingChange('assignee')}
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
  );
} 