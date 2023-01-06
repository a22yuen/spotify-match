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
  const [playlistItemsA, setPlaylistItemsA] = useState([]);
  const [playlistItemsB, setPlaylistItemsB] = useState([]);
  const [token, setToken] = useState(NO_TOKEN);

  useEffect(() => {
    // console.log("==user", user);
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    // log both playlistItems
    console.log("==========");
    console.log("==playlistItemsA", playlistItemsA);
    console.log("==playlistItemsB", playlistItemsB);
    console.log("==playlistA", playlistA);
    console.log("==playlistB", playlistB);
    console.log("************");
  }, [playlistItemsA, playlistItemsB]);

  const searchPlaylist = async (playlistLetter: string, playlist: string) => {
    if (playlistLetter === "A") {
      const response = await fetchPlaylistItems(token, playlistA);
      console.log("==response", response);
      setPlaylistItemsA(response);
    } else if (playlistLetter === "B") {
      const response = await fetchPlaylistItems(token, playlistB);
      console.log("==response", response);
      setPlaylistItemsB(response);
    }
  };

  const renderColumnA = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-white py-2 text-lg"> Your Playlist </div>
        <div className="flex flex-row gap-2">
          <input
            className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
            type="text"
            placeholder="Playlist Name"
            value={playlistA}
            onChange={(e) => setPlaylistA(e.target.value)}
          />
        </div>
        <div className="no-scrollbar h-96 overflow-y-auto rounded-lg">
          {playlistItemsA && <PlaylistItems items={playlistItemsA} />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-pink items-center">
      <div className="text-white py-2 text-lg mt-32">
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
      <GreenButton
        onClick={() => {
          console.log("==click");
          searchPlaylist("A", playlistA);
          searchPlaylist("B", playlistB);
        }}
      >
        Match!
      </GreenButton>
      <div className="flex flex-row w-3/4 px-32 gap-6 justify-between">
        {renderColumnA()}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-white py-2 text-lg"> Friend's Playlist </div>
          <div className="flex flex-row gap-2">
            <input
              className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
              type="text"
              placeholder="Playlist Name"
              value={playlistB}
              onChange={(e) => setPlaylistB(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
