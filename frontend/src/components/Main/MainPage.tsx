import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { GreenButton } from "../common/GreenButton";
import { useRouter } from "next/router";
import { loginUsers } from "../../api/api";

export const MainPage = () => {
  const router = useRouter();
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
  const uri = process.env.NEXT_PUBLIC_REDIRECT_URI

  const login_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${uri}&scope=user-read-private%20user-read-email%20user-library-read`

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
    } else {
      console.log("we are running on the server");
    }
    console.log("==process.env", client_id, uri)
  }, []);


  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-green items-center justify-center">
      <Header />
      <div className="text-white py-2 text-lg">
        {" "}
        Find your musical matches with your friends{" "}
      </div>
      <div className="h-10" />
      <GreenButton
        onClick={() => {
          const token = localStorage.getItem("token")
          console.log("link", login_url)
          console.log("==login_url")
          window.open(login_url + (!token ? "&show_dialog=true" : "") , "_self")
          // router.push("/playlists");
        }}
      >
        <p className="text-xl font-semibold">Log in with Spotify</p>
      </GreenButton>
    </div>
  );
};
