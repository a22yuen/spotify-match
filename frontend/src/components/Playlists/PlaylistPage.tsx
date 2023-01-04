import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../GreenButton";
import { AppContext } from "../../../context/AppContext";
import { PlaylistItems } from "./PlayListItems";

const NO_TOKEN = "NO_TOKEN";

const dummy_items = [
  {
    name: "Inside Outside",
    albumArt:
      "https://upload.wikimedia.org/wikipedia/en/7/77/MacMillerFaces.jpg",
    artist: "Mac Miller",
  },
  {
    name: "Fly Me To the Moon",
    albumArt: "https://i.ytimg.com/vi/ZEcqHA7dbwM/maxresdefault.jpg",
    artist: "Frank Sinatra",
  },
];

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
      <PlaylistItems items={dummy_items} />
    </div>
  );
};
