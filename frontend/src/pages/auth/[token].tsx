import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { AuthPage } from "../../components/Auth/AuthPage";

const Auth = () => {


  return (
    <>
      <Head>
        <title>Spotify Match - Authorizing</title>
        <meta name="description" content="Authorizing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Spotify_icon_blend.png" />
      </Head>
      <main className={styles.main}>

        <AuthPage/>
      </main>
    </>
  );
};

export default Auth;
