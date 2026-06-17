import Head from "next/head";
import Header from "@/components/header";
import HeaderProvider from "@/components/headerProvider";
import RotateWarning from "@/components/rotateWarning";
import CookieButton from "@/components/CookieButton";
import DimensioniContext from "@/context/dimensioniContext";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function MenuLayout({ Component, pageProps }) {
  const { getDynamicVh } = useContext(DimensioniContext);
  const router = useRouter();

  const isMenuRoute = !!router.asPath && router.asPath.startsWith("/menu");
  const isSignatureRoute = !!router.asPath && (router.asPath.startsWith("/menu/signature") || router.asPath.startsWith("/menu/lista"));

  return (
    <HeaderProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <link
          href="https://fonts.cdnfonts.com/css/civane-norm-regular"
          rel="stylesheet"
        />
      </Head>

      {isSignatureRoute ? (
        <RotateWarning />
      ) : null}

      <div
        style={{ height: `${getDynamicVh(100)}px` }}
        className={isSignatureRoute ? "overflow-hidden" : "overflow-auto"}
      >
        {isSignatureRoute ? <Header stile={"h-[13%]"} /> : null}

        <main
          className={
            isSignatureRoute
              ? "flex-grow h-[87%] overflow-hidden"
              : "flex-grow overflow-auto"
          }
        >
          <Component {...pageProps} />
          <CookieButton />
        </main>
      </div>
    </HeaderProvider>
  );
}
