import "../styles/globals.css";
import "antd/dist/antd.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  TicketIcon,
  XIcon,
} from "@heroicons/react/24/outline";

import { ThemeProvider } from "next-themes";

import NewLayout from "../layouts/newLayout";
import NoteBookLayout from "../layouts/notebook";
import AdminLayout from "../layouts/adminLayout";

const queryClient = new QueryClient();

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true });

  console.log(session);

  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status) return; // Do nothing while loading
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="flex h-screen justify-center items-center text-green-600">
      <ScaleLoader color="green" loading={status} size={100} />
    </div>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const actions = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => console.log("Home"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Notebook",
      description: "Personal User Notes",
      onTrigger: () => console.log("Dashboard"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Tickets",
      description:
        "Central store for all company & user tickets, open or closed",
      onTrigger: () => console.log("Documentation"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Documentation",
      description: "Documentation for peppermint.sh",
      onTrigger: () => console.log("Documentation"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Github",
      description: "OSS codebase for peppermint",
      onTrigger: () => console.log("Documentation"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Peppermint.sh",
      description: "",
      onTrigger: () => console.log("Documentation"),
      icon: <img className="h-7 ml-1 w-auto" src="/logo.svg" alt="Workflow" />,
    },
  ];

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  if (router.pathname === "/swagger") {
    return (
      <SessionProvider session={session}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    );
  }

  if (router.pathname.includes("/public")) {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  if (router.pathname.includes("/admin")) {
    return (
      <SessionProvider session={session}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <SpotlightProvider
            shortcut={["mod + P", "mod + K", "/"]}
            actions={actions}
          >
            <QueryClientProvider client={queryClient}>
              <Auth>
                <NewLayout>
                  <AdminLayout>
                    <Component {...pageProps} />
                  </AdminLayout>
                </NewLayout>
              </Auth>
            </QueryClientProvider>
          </SpotlightProvider>
        </MantineProvider>
      </SessionProvider>
    );
  }

  if (router.pathname.includes("/notebook")) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Auth>
            <NewLayout>
              <NoteBookLayout>
                <Component {...pageProps} />
              </NoteBookLayout>
            </NewLayout>
          </Auth>
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <SpotlightProvider
          shortcut={["mod + P", "mod + K", "/"]}
          actions={actions}
          searchPlaceholder="Search ..."
        >
          <QueryClientProvider client={queryClient}>
            {/* <ThemeProvider attribute="class"> */}
            <Auth>
              <NewLayout>
                {/* <SideLayout> */}
                <Notifications position="top-right" />
                <Component {...pageProps} />
                {/* </SideLayout> */}
              </NewLayout>
            </Auth>

            {/* </ThemeProvider> */}
          </QueryClientProvider>
        </SpotlightProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
