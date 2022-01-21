import "../styles/globals.css";
import 'antd/dist/antd.css';

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import SideLayout from '../components/Layout/SideLayout'

interface Props {
  children: any;
}

const queryClient = new QueryClient();

function Auth({ children }: Props ) {
  const { data: session, status } = useSession({required: true})
  const isUser = !!session?.user

  console.log(session)

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

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
        <Auth>
          <Component {...pageProps} />
        </Auth>
          </SideLayout>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
