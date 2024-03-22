import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  //@ts-expect-error
  return <Component {...pageProps} />;
}
