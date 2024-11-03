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
import ShadLayout from "../layouts/shad";
import GlobalShortcut from "@/shadcn/block/GlobalShortcut";
import { Toaster } from "@/shadcn/ui/toaster";

import { SidebarProvider } from "@/shadcn/ui/sidebar";

const queryClient = new QueryClient();

function Auth({ children }: any) {
  const { loading, user } = useUser();

  React.useEffect(() => {
    if (loading) return; 
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
        <Toaster />
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
                  <Toaster />
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
                <ShadLayout>
                  <Settings>
                    <Component {...pageProps} />
                    <Toaster />
                  </Settings>
                </ShadLayout>
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
                <Toaster />
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
        <Toaster />
      </SessionProvider>
    );
  }

  if (router.pathname === "/submit") {
    return (
      <>
        <Component {...pageProps} />
        <Toaster />
      </>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Theme>
          <QueryClientProvider client={queryClient}>
            <Auth>
              <ShadLayout>
                <Component {...pageProps} />
                <Toaster />
                </ShadLayout>
            </Auth>
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
