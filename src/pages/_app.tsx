import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <Toaster richColors />
        </Layout>
      </SessionProvider>
    </>
  );
}
