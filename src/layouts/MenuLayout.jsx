import Head from "next/head";
import Header from "@/components/header";
import HeaderProvider from "@/components/headerProvider";
import RotateWarning from "@/components/rotateWarning";
import CookieButton from "../components/CookieButton";
import DimensioniContext from "@/context/dimensioniContext";
import { useContext } from "react";

export default function MenuLayout({ Component, pageProps }) {
  const { getDynamicVh } = useContext(DimensioniContext);

  return (
    <HeaderProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <link href="https://fonts.cdnfonts.com/css/civane-norm-regular" rel="stylesheet" />
      </Head>
      <RotateWarning />
      <div style={{ height: `${getDynamicVh(100)}px` }} className="overflow-hidden">
        <Header stile={"h-[13%]"} />
        <main className="flex-grow h-[87%] overflow-hidden">
          <Component {...pageProps} />
          <CookieButton />
        </main>
      </div>
    </HeaderProvider>
  );
}
