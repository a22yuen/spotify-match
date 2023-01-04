import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../GreenButton";
import { AppContext } from "../../../context/AppContext";

const NO_TOKEN = "NO_TOKEN";
export const PlaylistPage = () => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    console.log("==user", user);
  }, []);
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-cyan-500 to-blue-500 items-center justify-center">
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
