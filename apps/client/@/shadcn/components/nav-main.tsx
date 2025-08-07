import { type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shadcn/ui/sidebar";
import { useRouter } from "next/router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    initial?: string;
    items?: {
      title: string;
      url: string;
      initial?: string;
    }[];
  }[];
}) {
  const router = useRouter();
  const sidebar = useSidebar();
  const [hideKeyboardShortcuts, setHideKeyboardShortcuts] = useState(false);

  useEffect(() => {
    const loadFlags = () => {
      const savedFlags = localStorage.getItem("featureFlags");
      if (savedFlags) {
        const flags = JSON.parse(savedFlags);
        const hideShortcuts = flags.find(
          (f: any) => f.name === "Hide Keyboard Shortcuts"
        )?.enabled;
        setHideKeyboardShortcuts(hideShortcuts || false);
      }
    };

    loadFlags();
    window.addEventListener("storage", loadFlags);
    return () => window.removeEventListener("storage", loadFlags);
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={!hideKeyboardShortcuts ? item.initial : item.title}
                onClick={() => router.push(item.url)}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center gap-x-2 w-full ">
                    {item.icon && <item.icon className="size-4" />}
                    <span
                      className={sidebar.state === "collapsed" ? "hidden" : ""}
                    >
                      {item.title}
                    </span>
                  </div>
                  {!hideKeyboardShortcuts && (
                    <span
                      className={sidebar.state === "collapsed" ? "hidden" : ""}
                    >
                      {item.initial}
                    </span>
                  )}
                </div>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      onClick={() => router.push(subItem.url)}
                      className="cursor-pointer flex flex-row items-center justify-between w-full px-0 pl-2.5 text-xs"
                    >
                      <span>{subItem.title}</span>
                      <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                        {!hideKeyboardShortcuts && (
                          <span className="">{subItem.initial}</span>
                        )}
                      </span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={!hideKeyboardShortcuts ? item.initial : item.title}
                onClick={() => {
                  if (item.url) {
                    router.push(item.url);
                  } else {
                    const event = new KeyboardEvent("keydown", {
                      key: item.initial,
                    });
                    document.dispatchEvent(event);
                  }
                }}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center gap-x-2 w-full">
                    {item.icon && <item.icon className="size-4" />}
                    <span
                      className={sidebar.state === "collapsed" ? "hidden" : ""}
                    >
                      {item.title}
                    </span>
                  </div>
                  {!hideKeyboardShortcuts && (
                    <span
                      className={sidebar.state === "collapsed" ? "hidden" : ""}
                    >
                      {item.initial}
                    </span>
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
