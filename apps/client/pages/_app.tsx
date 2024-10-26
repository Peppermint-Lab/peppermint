//@ts-nocheck
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";

import { ThemeProvider } from "next-themes";

import {
  DocumentCheckIcon,
  FolderIcon,
  HomeIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

import { MantineProvider } from "@mantine/core";
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider, useUser } from "../store/session";

import React from "react";

import AdminLayout from "../layouts/adminLayout";
import NewLayout from "../layouts/newLayout";
import NoteBookLayout from "../layouts/notebook";
import PortalLayout from "../layouts/portalLayout";
import Settings from "../layouts/settings";
import GlobalShortcut from "@/shadcn/block/GlobalShortcut";

const queryClient = new QueryClient();

function Auth({ children }: any) {
  const { loading, user } = useUser();

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

 

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  if (router.pathname.includes("/admin")) {
    return (
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Theme>
            <QueryClientProvider client={queryClient}>
              <Auth>
                <AdminLayout>
                  <Component {...pageProps} />
                </AdminLayout>
              </Auth>
            </QueryClientProvider>
          </Theme>
        </ThemeProvider>
      </SessionProvider>
    );
  }

  if (router.pathname.includes("/settings")) {
    return (
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Theme>
            <QueryClientProvider client={queryClient}>
              <Auth>
                <NewLayout>
                  <Settings>
                    <Component {...pageProps} />
                  </Settings>
                </NewLayout>
              </Auth>
            </QueryClientProvider>
          </Theme>
        </ThemeProvider>
      </SessionProvider>
    );
  }

  if (router.pathname.startsWith("/portal")) {
    return (
      <SessionProvider>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <Auth>
              <PortalLayout>
                <Component {...pageProps} />
              </PortalLayout>
            </Auth>
          </QueryClientProvider>
        </Theme>
      </SessionProvider>
    );
  }

  if (router.pathname === "/onboarding") {
    return (
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  if (router.pathname === "/submit") {
    return <Component {...pageProps} />;
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Theme>
          <QueryClientProvider client={queryClient}>
            <Auth>
              <NewLayout>
                <Component {...pageProps} />
              </NewLayout>
            </Auth>
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
