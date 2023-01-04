import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { GreenButton } from "../GreenButton";
import { useRouter } from "next/router";

const NO_TOKEN = "NO_TOKEN";
export const MainPage = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      localStorage.setItem("token", "test_token");
    } else {
      console.log("we are running on the server");
    }
    setToken(localStorage?.getItem("token") ?? NO_TOKEN);
  }, []);

  useEffect(() => {
    console.log("==token", token);
  }, [token]);

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-denim items-center justify-center">
      <Header />
      <div className="text-white py-2 text-lg">
        {" "}
        Find your musical matches with your friends{" "}
      </div>
      <div className="h-10" />
      <GreenButton
        onClick={() => {
          console.log("ayy");
          router.push("/playlists");
          window;
        }}
      >
        <p className="font-semibold">Compare Playlists</p>
      </GreenButton>
    </div>
  );
};
