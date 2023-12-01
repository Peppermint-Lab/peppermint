import "@radix-ui/themes/styles.css";
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
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider, useUser } from "../store/session";

import React from "react";

import AdminLayout from "../layouts/adminLayout";
import NewLayout from "../layouts/newLayout";
import NoteBookLayout from "../layouts/notebook";
import Settings from "../layouts/settings";

const queryClient = new QueryClient();

function Auth({ children }: any) {
  const { loading, user } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (loading) return; // Do nothing while loading
  }, [user, loading]);

  if (user) {
    return children;
  }

  return (
    <div className="flex h-screen justify-center items-center text-green-600"></div>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const router = useRouter();

  const actions = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => router.push("/"),
      icon: <HomeIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Notebook",
      description: "Personal User Notes",
      onTrigger: () => router.push("/notebook"),
      icon: <FolderIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Tickets",
      description:
        "Central store for all company & user tickets, open or closed",
      onTrigger: () => router.push("/tickets"),
      icon: <TicketIcon className="h-8 w-8 text-gray-900" />,
    },
    {
      title: "Documentation",
      description: "Documentation for peppermint.sh",
      onTrigger: () => router.push("https://docs.peppermint.sh"),
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
      <>
        <Notifications position="top-right" />
        <Component {...pageProps} />
      </>
    );
  }

  if (router.pathname.includes("/admin")) {
    return (
      <SessionProvider>
        <Theme>
          <MantineProvider withNormalizeCSS withGlobalStyles>
            <SpotlightProvider
              shortcut={["mod + P", "mod + K", "/"]}
              actions={actions}
            >
              <QueryClientProvider client={queryClient}>
                <Auth>
                  <NewLayout>
                    <AdminLayout>
                      <Notifications position="top-right" />
                      <Component {...pageProps} />
                    </AdminLayout>
                  </NewLayout>
                </Auth>
              </QueryClientProvider>
            </SpotlightProvider>
          </MantineProvider>
        </Theme>
      </SessionProvider>
    );
  }

  if (router.pathname === "/notebook/[id]") {
    return (
      <SessionProvider>
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
                    <Notifications position="top-right" />
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

  if (router.pathname.includes("/settings")) {
    return (
      <SessionProvider>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <SpotlightProvider
            shortcut={["mod + P", "mod + K", "/"]}
            actions={actions}
            searchPlaceholder="Search ..."
          >
            <QueryClientProvider client={queryClient}>
              <Auth>
                <NewLayout>
                  <Settings>
                    <Notifications position="top-right" />
                    <Component {...pageProps} />
                  </Settings>
                </NewLayout>
              </Auth>
            </QueryClientProvider>
          </SpotlightProvider>
        </MantineProvider>
      </SessionProvider>
    );
  }

  if (router.pathname.includes("/portal")) {
    return (
      <>
        <Notifications position="top-right" />
        <Component {...pageProps} />
      </>
    );
  }

  if (router.pathname === "/onboarding") {
    return (
      <SessionProvider>
        <Notifications position="top-right" />
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <Theme>
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
      </Theme>
    </SessionProvider>
  );
}

export default MyApp;
