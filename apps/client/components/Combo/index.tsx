import { Coffee, LucideIcon } from "lucide-react";
import * as React from "react";

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

export function UserCombo({
  value,
  update,
  defaultName,
  hideInitial,
  showIcon,
  disabled,
  placeholder,
}) {
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
            disabled={disabled}
          >
            {selectedStatus ? (
              <div className="flex flex-row space-x-2 w-[120px]">
                {!hideInitial && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs font-medium leading-none text-white uppercase ">
                        {selectedStatus.name[0]}
                      </span>
                    </span>
                  </div>
                )}
                <span>{defaultName}</span>
              </div>
            ) : defaultName ? (
              <>
                <div className="flex flex-row space-x-3">
                  {!hideInitial && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-xs font-medium leading-none text-white uppercase ">
                          {defaultName[0]}
                        </span>
                      </span>
                    </div>
                  )}
                  <span className="">{defaultName}</span>
                </div>
              </>
            ) : (
              <span>unassigned</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  className=" hover:cursor-pointer"
                  value={undefined}
                  onSelect={() => {
                    setSelectedStatus(null);
                    update(null);
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
                  <span>Unassign</span>
                </CommandItem>
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

export function IconCombo({
  value,
  update,
  defaultName,
  hideInitial,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<any | null>(null);
  const defaultIcon = value.find((k) => k.value === defaultName);

  console.log(disabled);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[180px] justify-start border-none"
            disabled={disabled}
          >
            {selectedStatus ? (
              <div className="flex flex-row space-x-2 w-[120px]">
                {!hideInitial && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-6 w-6 pl-2.5 items-center justify-center ">
                      <span className="text-xs font-medium leading-none text-foreground uppercase ">
                        <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                      </span>
                    </span>
                  </div>
                )}
                <span className="mt-[2.5px] capitalize">
                  {selectedStatus.value}
                </span>
              </div>
            ) : defaultName ? (
              <div className="flex flex-row space-x-2">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-6 w-6 pl-2.5 items-center justify-center ">
                    <span className="text-xs font-medium leading-none text-foreground uppercase ">
                      {defaultIcon && (
                        <defaultIcon.icon className="mr-2 h-4 w-4 shrink-0" />
                      )}
                    </span>
                  </span>
                </div>
                <span className="mt-[2.5px] capitalize">{defaultName}</span>
              </div>
            ) : (
              <span>unassigned</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
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
                    <val.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        val.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
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

export function ClientCombo({
  value,
  update,
  defaultName,
  hideInitial,
  showIcon,
  disabled,
}) {
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
            disabled={disabled}
          >
            {selectedStatus ? (
              <div className="flex flex-row space-x-2 w-[120px]">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-6 w-6 pl-2.5 items-center justify-center ">
                    <span className="text-xs font-medium leading-none text-foreground uppercase ">
                      <Coffee className="mr-2 h-4 w-4 shrink-0 " />
                    </span>
                  </span>
                </div>
                <span className="mt-[2px]">{defaultName}</span>
              </div>
            ) : defaultName ? (
              <>
                <div className="flex flex-row items-center space-x-2">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-6 w-6 pl-2.5 items-center justify-center ">
                      <span className="text-xs font-medium leading-none text-foreground uppercase ">
                        <Coffee className="mr-2 h-4 w-4 shrink-0 " />
                      </span>
                    </span>
                  </div>
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
            <CommandInput placeholder="Change client..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  className=" hover:cursor-pointer"
                  value={undefined}
                  onSelect={() => {
                    setSelectedStatus(null);
                    update(null);
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
                  <span>Unassign</span>
                </CommandItem>
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
