import { Button } from "@radix-ui/themes";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";

import { AccountDropdown } from "../components/AccountDropdown";

import { AppSidebar } from "@/shadcn/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shadcn/ui/sidebar";
import { Bell } from "lucide-react";
import { useUser } from "../store/session";

export default function ShadLayout({ children }: any) {
  const location = useRouter();

  const { loading, user, fetchUserProfile } = useUser();


  const { t, lang } = useTranslation("peppermint");

  if (!user) {
    location.push("/auth/login");
  }

  if (location.pathname.includes("/admin") && user.isAdmin === false) {
    location.push("/");
    alert("You do not have the correct perms for that action.");
  }

  if (user && user.external_user) {
    location.push("/portal");
  }

  return (
    !loading &&
    user && (
      <div className="min-h-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full">
            <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-x-4 border-b bg-background px-4 sm:gap-x-6">
              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                <SidebarTrigger title="[" />
                <div className="sm:flex hidden w-full justify-start items-center space-x-6">
                  {user.isAdmin && (
                    <Link href="https://github.com/Peppermint-Lab/peppermint/releases">
                      <span className="inline-flex items-center rounded-md bg-green-700/10 px-3 py-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                        Version {process.env.NEXT_PUBLIC_CLIENT_VERSION}
                      </span>
                    </Link>
                  )}
                </div>

                <div className="flex w-full sticky right-0 justify-end items-center gap-x-2 lg:gap-x-2 ">
                  <Button
                    variant="outline"
                    className="relative rounded-md p-2 text-gray-400 hover:text-gray-500 hover:cursor-pointer focus:outline-none"
                  >
                    <Link href="/notifications">
                      <Bell className="h-4 w-4 text-foreground" />
                      {user.notifcations.filter(
                        (notification) => !notification.read
                      ).length > 0 && (
                        <svg
                          className="h-2.5 w-2.5 absolute bottom-6 left-6 animate-pulse fill-green-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                      )}
                    </Link>
                  </Button>

                  {user.isAdmin && (
                    <Link
                      href="https://github.com/Peppermint-Lab/peppermint/discussions"
                      target="_blank"
                      className="hover:cursor-pointer"
                    >
                      <Button
                        variant="outline"
                        className="text-foreground hover:cursor-pointer whitespace-nowrap"
                      >
                        Send Feedback
                      </Button>
                    </Link>
                  )}

                  <AccountDropdown />
                </div>
              </div>
            </div>
            {!loading && !user.external_user && (
              <main className="bg-background min-h-screen">{children}</main>
            )}
          </div>
        </SidebarProvider>
      </div>
    )
  );
}
