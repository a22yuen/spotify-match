import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
import { AppContext } from "../../../context/AppContext";
import { PlaylistItems } from "./PlayListItems";
import {
  fetchPlaylistResults,
  fetchPlaylistItems,
  fetchUserData,
} from "../../api/spotify";
import { UserHeader } from "../common/UserHeader";

const NO_TOKEN = "NO_TOKEN";

export const PlaylistPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [playlistA, setPlaylistA] = useState("");
  const [playlistB, setPlaylistB] = useState("");
  const [playlistItemsA, setPlaylistItemsA] = useState([]);
  const [playlistItemsB, setPlaylistItemsB] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [token, setToken] = useState(NO_TOKEN);

  const fetchUser = async (token: string) => {
    const response = await fetchUserData(token);
    setUser(response);
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      fetchUser(t);
    }
  }, []);

  const searchPlaylist = async (playlistLetter: string, playlist: string) => {
    try {
      const playlistId = playlist.split("/")[4]?.split("?")[0];
      const response = await fetchPlaylistItems(token, playlistId);
      console.log("==response", response);
      if (playlistLetter === "A") {
        setPlaylistItemsA(response);
      } else if (playlistLetter === "B") {
        setPlaylistItemsB(response);
      }
    } catch (e) {
      console.log("Invalid search playlist URL", e);
      return;
    }
  };

  const searchResults = async (
    playlist1: string,
    playlist2: string,
    mode: string
  ) => {
    try {
      const playlistId1 = playlist1.split("/")[4]?.split("?")[0];
      const playlistId2 = playlist2.split("/")[4]?.split("?")[0];
      const response = await fetchPlaylistResults(
        playlistId1,
        playlistId2,
        mode,
        token
      );
      console.log("==response", response);
      setPlaylistResults(response.filtered);
      return;
    } catch (e) {
      console.log("Invalid result playlist URL");
      return;
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
            onChange={(e) => {
              setPlaylistA(e.target.value);
              searchPlaylist("A", e.target.value);
            }}
          />
        </div>
        <div className="no-scrollbar h-96 overflow-y-auto rounded-lg">
          {playlistItemsA && <PlaylistItems items={playlistItemsA} />}
        </div>
      </div>
    );
  };

  const renderColumnB = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-white py-2 text-lg"> Friend's Playlist </div>
        <div className="flex flex-row gap-2">
          <input
            className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
            type="text"
            placeholder="Playlist Name"
            value={playlistB}
            onChange={(e) => {
              setPlaylistB(e.target.value);
              searchPlaylist("B", e.target.value);
            }}
          />
        </div>
        <div className="no-scrollbar h-96 overflow-y-auto rounded-lg">
          {playlistItemsB && <PlaylistItems items={playlistItemsB} />}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-white py-2 text-lg"> Resulting Playlist </div>
        <div className="flex flex-row gap-2 invisible">
          <input
            className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
            type="text"
            placeholder="Playlist Name"
            value={playlistB}
          />
        </div>
        <div className="no-scrollbar h-96 overflow-y-auto rounded-lg">
          {playlistResults && <PlaylistItems items={playlistResults} />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-pink items-center">
      <div className="flex h-8 w-full bg-pink" />

      <UserHeader />
      <div className="text-white font-semibold py-2 text-lg mt-32">
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
        // test commit
      }
      <div className="flex flex-row w-3/4 px-32 gap-6 justify-between">
        {renderColumnA()}
        {renderColumnB()}
        {renderResults()}
      </div>
      <div className="my-6">
        <GreenButton
          onClick={() => {
            console.log("==click sim");
            searchResults(playlistA, playlistB, "sim");
          }}
        >
          <p className="text-base font-semibold">Similarities</p>
        </GreenButton>
        <GreenButton
          onClick={() => {
            console.log("==click sim");
            searchResults(playlistA, playlistB, "diff");
          }}
        >
          <p className="text-base font-semibold">Differences</p>
        </GreenButton>
      </div>
    </div>
  );
};
