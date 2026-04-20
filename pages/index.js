import React from "react";
import Navbar from "@/components/Navbar";
import Hero_section from "@/components/Hero_section";
import Our_soul from "@/components/Our_soul";
import Rooms from "@/components/Rooms";
import Pool from "@/components/Pool";
import Find_us from "@/components/Find_us";
import Bar_restaurant from "@/components/Bar_restaurant";
import Footer from "@/components/Footer";
import CookieButton from "../components/CookieButton";
import Head from "next/head";

export default function Home() {
  return (
    <div className="text-white">
      <Head>
        <title>Mantra Ristoclub</title>
        <meta
          name="description"
          content="Un&#39;esperienza sensoriale tra gusto e musica"
        />
      </Head>
      <Navbar />
      <Hero_section />
      <Our_soul />
      <Bar_restaurant />
      <Rooms />
      <Pool />
      <Find_us />
      <Footer />
      <CookieButton />
    </div>
  );
}