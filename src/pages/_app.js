import "@/styles/globals.css";
import { useRouter } from "next/router";
import DimensioniProvider from "@/components/dimensioniProvider";
import MenuLayout from "@/layouts/MenuLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isMenuRoute = router.pathname.startsWith("/menu");

  if (isMenuRoute) {
    return (
      <DimensioniProvider>
        <MenuLayout Component={Component} pageProps={pageProps} />
      </DimensioniProvider>
    );
  }

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
