import { X } from "lucide-react";

interface FilterBadgeProps {
  text: string;
  onRemove: () => void;
}

export default function FilterBadge({ text, onRemove }: FilterBadgeProps) {
  return (
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
} 