import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

import { MainPage } from "../components/Main/MainPage";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token && token !== "epic token"){
  //     console.log("==logged in", token)
  //     router.push('/home')
  //   }
  // }, [])

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
