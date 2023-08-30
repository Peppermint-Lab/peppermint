import "antd/dist/antd.css";
import "../styles/globals.css";

import {
  DocumentCheckIcon,
  FolderIcon,
  HomeIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import AdminLayout from "../layouts/adminLayout";
import NewLayout from "../layouts/newLayout";
import NoteBookLayout from "../layouts/notebook";

const queryClient = new QueryClient();

function Auth({ children }: any) {
  const { data: session, status } = useSession({ required: true });

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
      {/* <ScaleLoader color="green" loading={status} size={100} /> */}
    </div>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const router = useRouter();

  const actions = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => router.push("/"),
      //@ts-expect-error
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Notebook",
      description: "Personal User Notes",
      onTrigger: () => router.push("/notebook"),
      //@ts-expect-error
      icon: <FolderIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Tickets",
      description:
        "Central store for all company & user tickets, open or closed",
      onTrigger: () => router.push("/tickets"),
      //@ts-expect-error
      icon: <TicketIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Documentation",
      description: "Documentation for peppermint.sh",
      onTrigger: () => router.push("https://docs.peppermint.sh"),
      //@ts-expect-error
      icon: <DocumentCheckIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Github",
      description: "OSS codebase for peppermint",
      onTrigger: () =>
        router.push("https://github.com/Peppermint-Lab/peppermint"),
      icon: (
        <img className="h-7 ml-1 w-auto" src="/github.svg" alt="Workflow" />
      ),
    },
    {
      title: "Peppermint.sh",
      description: "",
      onTrigger: () => router.push("https://peppermint.sh"),
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

  if (router.pathname === "/notebook/[id]") {
    return (
      <SessionProvider session={session}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <SpotlightProvider
            shortcut={["mod + P", "mod + K", "/"]}
            actions={actions}
            searchPlaceholder="Search ..."
          >
            <QueryClientProvider client={queryClient}>
              <Auth>
                <NewLayout>
                  <NoteBookLayout>
                    <Component {...pageProps} />
                  </NoteBookLayout>
                </NewLayout>
              </Auth>
            </QueryClientProvider>
          </SpotlightProvider>
        </MantineProvider>
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
            <Auth>
              <NewLayout>
                <Notifications position="top-right" />
                <Component {...pageProps} />
              </NewLayout>
            </Auth>
          </QueryClientProvider>
        </SpotlightProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
