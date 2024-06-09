import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/shadcn/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export function UserCombo({ value, update, defaultName, hideInitial, Icon }) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<any | null>(null);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[180px] justify-start border-none"
          >
            {selectedStatus ? (
              <div className="flex flex-row space-x-4 w-[120px]">
                {!hideInitial && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs font-medium leading-none text-white uppercase ">
                        {selectedStatus.name[0]}
                      </span>
                    </span>
                  </div>
                )}
                {selectedStatus.name}
              </div>
            ) : defaultName ? (
              <>
                <div className="flex flex-row space-x-2">
                  {!hideInitial && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-xs font-medium leading-none text-white uppercase ">
                          {defaultName[0]}
                        </span>
                      </span>
                    </div>
                  )}
                  <span>{defaultName}</span>
                </div>
              </>
            ) : (
              <span>unassigned</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            {/* <CommandInput placeholder="Change status..." /> */}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {value.map((val) => (
                  <CommandItem
                    className=" hover:cursor-pointer"
                    key={val.value}
                    value={val}
                    onSelect={(selected) => {
                      const user = value.find((k) => k.name === selected);
                      setSelectedStatus(user);
                      update(user);
                      setOpen(false);
                    }}
                  >
                    {/* <val.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        val.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    /> */}
                    <span>{val.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
