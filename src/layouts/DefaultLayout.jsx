import Footer from "@/components/Footer";

export default function DefaultLayout({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
