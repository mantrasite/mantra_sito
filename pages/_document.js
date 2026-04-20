import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Font da Google Fonts */}
        <link
          href="https://fonts.cdnfonts.com/css/civane-norm-regular"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Favicon PNG */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>Mantra Ristoclub</title>
        <meta name="description" content="Un&#39;esperienza sensoriale tra gusto e musica" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
