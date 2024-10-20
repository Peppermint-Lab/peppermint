import {
    Combobox,
    Dialog,
    Disclosure,
    Menu,
    Transition,
  } from "@headlessui/react";
  import {
    Bars3Icon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon,
    InboxStackIcon,
    MagnifyingGlassIcon,
    TicketIcon,
    XMarkIcon,
  } from "@heroicons/react/24/outline";
  import { getCookie } from "cookies-next";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import { Fragment, useEffect, useState } from "react";
  import { Button } from "@radix-ui/themes";
  import useTranslation from "next-translate/useTranslation";
  
  import CreateTicketModal from "../components/CreateTicketModal";
  import { AccountDropdown } from "../components/AccountDropdown";
  
  import { useUser } from "../store/session";
  import ThemeSettings from "../components/ThemeSettings";
  import {
    Bell,
    Building,
    Settings,
    SquareActivity,
    SquareKanban,
  } from "lucide-react";
  import { AppSidebar } from "@/shadcn/components/app-sidebar";
  import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar";
  
  const quickActions = [
    // { name: "Add new file...", icon: DocumentPlusIcon, shortcut: "N", url: "#" },
    // { name: "Add new folder...", icon: FolderPlusIcon, shortcut: "F", url: "#" },
    // { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
    // { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function NewLayout({ children }: any) {
    const location = useRouter();
  
    const { loading, user, fetchUserProfile } = useUser();
    const locale = user ? user.language : "en";
  
    const [queues, setQueues] = useState([]);
    const [keypressdown, setKeyPressDown] = useState(false);
  
    const { t, lang } = useTranslation("peppermint");
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
  
    const navigation = [
      // {
      //   name: t("create_ticket"),
      //   href: `/${locale}/new`,
      //   icon: PlusIcon,
      //   current: location.pathname === "/new" ? true : false,
      //   initial: "c",
      // },
      {
        name: t("sl_dashboard"),
        href: `/${locale}/`,
        icon: Building,
        current: location.pathname === "/" ? true : false,
        initial: "h",
      },
      // {
      //   name: t("sl_notebook"),
      //   href: `/${locale}/notebook`,
      //   icon: FolderIcon,
      //   current: location.pathname === "/notebook" ? true : false,
      //   initial: "n",
      // },
      // {
      //   name: "Email Queues",
      //   current: false,
      //   icon: InboxStackIcon,
      //   href: `/${locale}/tickets`,
      //   children: queues,
      //   inital: null,
      // },
    ];
  
    function handleKeyPress(event: any) {
      const pathname = location.pathname;
      if (
        document.activeElement!.tagName !== "INPUT" &&
        document.activeElement!.tagName !== "TEXTAREA" &&
        !document.activeElement!.className.includes("ProseMirror") &&
        !pathname.includes("/new")
      ) {
        switch (event.key) {
          case "c":
            setKeyPressDown(true);
            break;
          case "h":
            location.push("/");
            break;
          case "n":
            location.push("/notebook");
            break;
          case "t":
            location.push("/issues");
            break;
          case "a":
            location.push("/admin");
            break;
          case "o":
            location.push("/issues/open");
            break;
          case "f":
            location.push("/issues/closed");
            break;
          // case "Escape":
          //   location.push("/tickets");
          //   break;
          default:
            break;
        }
      }
    }
  
    useEffect(() => {
      // attach the event listener
      document.addEventListener("keydown", handleKeyPress);
  
      // remove the event listener
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [handleKeyPress, location]);
  
    return (
      !loading &&
      user && (
        <div className="min-h-screen overflow-hidden ">
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
              <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-x-4 border-b bg-background px-4 sm:gap-x-6">
                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                  <SidebarTrigger />
                  <div className="sm:flex hidden w-full justify-start items-center space-x-6">
                    {user.isAdmin && (
                      <Link href="https://github.com/Peppermint-Lab/peppermint/releases">
                        <span className="inline-flex items-center rounded-md bg-green-700/10 px-3 py-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                          Version {process.env.NEXT_PUBLIC_CLIENT_VERSION}
                        </span>
                      </Link>
                    )}
  
                    {/* <CommandModal /> */}
                  </div>
  
                  <div className="flex w-full justify-end items-center gap-x-2 lg:gap-x-2 ">
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
  
                    {/* Profile dropdown */}
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
  