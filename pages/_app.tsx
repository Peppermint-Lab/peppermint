import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
    </>
  );
}

export default MyApp
