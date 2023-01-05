import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
import { AppContext } from "../../../context/AppContext";
import { PlaylistItems } from "./PlayListItems";
import { fetchPlaylists, fetchPlaylistItems } from "../../api/spotify";

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
  const [playlistA, setPlaylistA] = useState("");
  const [playlistB, setPlaylistB] = useState("");
  const [playlistItemsA, setPlaylistItemsA] = useState({});
  const [playlistItemsB, setPlaylistItemsB] = useState({});
  const [token, setToken] = useState(NO_TOKEN);

  useEffect(() => {
    console.log("==user", user);
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
    }
  }, []);

  const searchPlaylist = (playlistLetter: string, playlist: string) => {
    if (playlistLetter === "A") {
      setPlaylistA(playlist);
      setPlaylistItemsA(fetchPlaylistItems(token, playlistA));
    } else if (playlistLetter === "B") {
      setPlaylistB(playlist);
      setPlaylistItemsB(fetchPlaylistItems(token, playlistB));
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-cyan-500 to-blue-500 items-center justify-center">
      <div className="text-white py-2 text-lg">
        {" "}
        Share songs with your friends{" "}
      </div>
      <div className="flex flex-row gap-2">
        {" "}
        Compare your playlist with a friend, and find out which songs they don't
        have{" "}
      </div>
      <div className="h-10" />
      {
        //3 column div
      }
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <div className="text-white py-2 text-lg"> Your Playlist </div>
          <div className="flex flex-row gap-2">
            <input
              className="rounded"
              type="text"
              placeholder="Playlist Name"
              value={playlistA}
              onChange={(e) => searchPlaylist("A", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white py-2 text-lg"> Friend's Playlist </div>
          <div className="flex flex-row gap-2">
            <input
              className="rounded"
              type="text"
              placeholder="Playlist Name"
              value={playlistB}
              onChange={(e) => searchPlaylist("B", e.target.value)}
            />
          </div>
        </div>
      </div>
      <PlaylistItems items={dummy_items} />
    </div>
  );
};
