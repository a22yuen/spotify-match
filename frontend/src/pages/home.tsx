import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../../styles/Home.module.css";

import { MainPage } from "../components/Main/MainPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Match</title>
        <meta
          name="description"
          content="Find your musical matches with your friends"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Spotify_icon_blend.png" />
      </Head>
      <main className={styles.main}>
        <MainPage />
      </main>
    </>
  );
}
