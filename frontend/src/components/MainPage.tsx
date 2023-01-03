import React from "react";
import { Header } from "./Header";
import { GreenButton } from "./GreenButton";

const NO_TOKEN = "NO_TOKEN";
export const MainPage = () => {
  const token = localStorage.getItem("token") ?? NO_TOKEN;

  return (
    <div className="flex flex-col w-full bg-black items-center justify-center">
      <Header />
      <div className="text-white py-2 text-lg">
        {" "}
        Find your musical matches with your friends{" "}
      </div>
      <div className="h-10" />
      <GreenButton
        onClick={() => {
          console.log("ayy");
        }}
      >
        <p className="font-semibold">Compare Playlists</p>
      </GreenButton>
    </div>
  );
};
