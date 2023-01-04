import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { PlaylistPage } from "../components/Playlists/PlaylistPage";

const Playlists = () => {
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
        <PlaylistPage />
      </main>
    </>
  );
};

export default Playlists;
