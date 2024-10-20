import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/shadcn/components/nav-main";
import { NavProjects } from "@/shadcn/components/nav-projects";
import { NavUser } from "@/shadcn/components/nav-user";
import { TeamSwitcher } from "@/shadcn/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shadcn/ui/sidebar";
import ThemeSettings from "../../../components/ThemeSettings";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Peppermint",
      logo: GalleryVerticalEnd,
      plan: `version: ${process.env.NEXT_PUBLIC_CLIENT_VERSION}`,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Issues",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Open",
          url: "#",
        },
        {
          title: "Closed",
          url: "#",
        },
      ],
    },
    {
      title: "Admin",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center gap-2 ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Peppermint</span>
            <span className="truncate text-xs">
              version: {process.env.NEXT_PUBLIC_CLIENT_VERSION}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="hidden sm:block ">
          <ThemeSettings />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
