import "../styles/globals.css";
import "antd/dist/antd.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Head from "next/head";
import { HotKeys } from "react-hotkeys";

import { ThemeProvider } from "next-themes";

import SideLayout from "../layouts/SideLayout";

const queryClient = new QueryClient();

function Auth({ children }) {
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
      <ScaleLoader color="green" loading={status} size={100} />
    </div>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const keyMap = {
    NEW_TICKET: ["c"],
    // CLOSE: ["esc"],
  };

  if (
    router.asPath.slice(0, 5) === "/auth" ||
    router.pathname === "/tickets/new/[id]" ||
    router.pathname === "/tickets/new/[id]/submitted"
  ) {
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

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider attribute="class"> */}
          <Auth>
            <HotKeys keyMap={keyMap}>
              <SideLayout>
                <Component {...pageProps} />
              </SideLayout>
            </HotKeys>
          </Auth>

          {/* </ThemeProvider> */}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
