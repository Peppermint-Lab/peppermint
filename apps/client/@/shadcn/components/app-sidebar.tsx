import {
  Building,
  FileText,
  ListPlus,
  Settings,
  SquareKanban
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/shadcn/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shadcn/ui/sidebar";
import useTranslation from "next-translate/useTranslation";
import CreateTicketModal from "../../../components/CreateTicketModal";
import ThemeSettings from "../../../components/ThemeSettings";
import AuthService from "../../../services/AuthService"; // Import AuthService
import { useKeyPress } from "../../../hooks/useKeyPress"; // Import custom hook

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation("peppermint");
  const { user } = useUser();
  const locale = user ? user.language : "en";
  const { keypressdown, setKeyPressDown } = useKeyPress();

  // Delegate authentication logic to AuthService
  AuthService.checkUserAuthentication();

  const data = {
    teams: [
      {
        name: "Peppermint",
        plan: `version: ${process.env.NEXT_PUBLIC_CLIENT_VERSION}`,
      },
    ],
    navMain: [
      {
        title: "New Issue",
        url: ``,
        icon: ListPlus,
        isActive: location.pathname === "/" ? true : false,
        initial: "c",
      },
      {
        title: t("sl_dashboard"),
        url: `/${locale}/`,
        icon: Building,
        isActive: location.pathname === "/" ? true : false,
        initial: "h",
      },
      {
        title: "Documents",
        url: `/${locale}/documents`,
        icon: FileText,
        isActive: location.pathname === "/documents" ? true : false,
        initial: "d",
        internal: true,
      },
      {
        title: "Issues",
        url: `/${locale}/issues`,
        icon: SquareKanban,
        isActive: location.pathname === "/issues" ? true : false,
        initial: "t",
        items: [
          {
            title: "Open",
            url: "/issues/open",
            initial: "o",
          },
          {
            title: "Closed",
            url: "/issues/closed",
            initial: "f",
          },
        ],
      },
      {
        title: "Admin",
        url: "/admin",
        icon: Settings,
        isActive: true,
        initial: "a",
      },
    ],
  };


  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center gap-2 ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <img src="/favicon/favicon-32x32.png" className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-xl">Peppermint</span>
            <span className="truncate text-xs">
              version: {process.env.NEXT_PUBLIC_CLIENT_VERSION}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <CreateTicketModal
          keypress={keypressdown}
          setKeyPressDown={setKeyPressDown}
        />
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
