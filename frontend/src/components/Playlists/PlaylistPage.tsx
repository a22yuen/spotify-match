import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
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

const fetchPlaylists = async () => {
  console.log(
    JSON.stringify({
      playlistA: "1PhIh9as2SfCG1YweNqmNW",
      playlistB: "6FW87hw1HeyqjSbB23Si0h",
      token:
        "BQBTjpn5bPXQV74CjyP-p09KouB2aGMvvtOhCDif4nUicafvu4DOj9WpaHaJ9_UkPPMvs-jS_ys_OqwgS5GuirYQawdMbafdjX3YT931B1aZLardknmP3H0TIehU78A1OVp-SL-Rn7fN0Jl_3hoi6sGHYVyfQnlTbRBkDu2YJCQxlQwgCSfydCxrhbLpV1-2EtQ",
    })
  );
  const response = await fetch(
    "https://vhb0e07ykd.execute-api.us-east-2.amazonaws.com/filter",
    {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        playlistA: "1PhIh9as2SfCG1YweNqmNW",
        playlistB: "6FW87hw1HeyqjSbB23Si0h",
        token:
          "BQBTjpn5bPXQV74CjyP-p09KouB2aGMvvtOhCDif4nUicafvu4DOj9WpaHaJ9_UkPPMvs-jS_ys_OqwgS5GuirYQawdMbafdjX3YT931B1aZLardknmP3H0TIehU78A1OVp-SL-Rn7fN0Jl_3hoi6sGHYVyfQnlTbRBkDu2YJCQxlQwgCSfydCxrhbLpV1-2EtQ",
      }),
    }
  );
  const parsed = await response.json();
  console.log("==parsed play", parsed);
};

export const PlaylistPage = () => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    console.log("==user", user);
    fetchPlaylists();
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
