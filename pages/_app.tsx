import "../styles/globals.css";
import 'antd/dist/antd.css';

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import SideLayout from '../components/Layout/SideLayout'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
        <SideLayout>
          <Component {...pageProps} />
          </SideLayout>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
