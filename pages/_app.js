import "../styles/globals.css";
import "antd/dist/antd.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import ScaleLoader from "react-spinners/ScaleLoader";

import SideLayout from "../components/Layout/SideLayout";

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

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Auth>
            <SideLayout>
              <Component {...pageProps} />
            </SideLayout>
          </Auth>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
