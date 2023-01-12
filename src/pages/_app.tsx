import "app/index.css";
import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { MainLayout } from "shared/UI/main-layout/MainLayout";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";


export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);

  // return getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider
      session={pageProps.session as Session}
      refetchInterval={0}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;
