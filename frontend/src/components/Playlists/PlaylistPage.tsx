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

enum PlaylistType {
  mine,
  other,
  results,
}
const NO_TOKEN = "NO_TOKEN";

export const PlaylistPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [urlA, setUrlA] = useState("");
  const [urlB, setUrlB] = useState("");
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

  const searchPlaylist = async (setPlaylistItems: any, playlist: string) => {
    try {
      const playlistId = playlist.split("/")[4]?.split("?")[0];
      const response = await fetchPlaylistItems(token, playlistId);
      console.log("==response", response);
      setPlaylistItems(response);
    } catch (e) {
      console.log("Invalid search playlist URL", e);
      return;
    }
  };

  const searchResults = async (urlA: string, urlB: string, mode: string) => {
    try {
      const playlistId1 = urlA.split("/")[4]?.split("?")[0];
      const playlistId2 = urlB.split("/")[4]?.split("?")[0];
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

  const renderPlaylistCol = (
    url: any,
    setUrl: any,
    playlistItems: any,
    setPlaylistItems: any,
    type: any
  ) => {
    const label =
      type == PlaylistType.mine
        ? "Your Playlist"
        : type == PlaylistType.other
        ? "Friend's Playlist"
        : "Results";
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-white py-2 text-lg"> {label} </div>
        <div
          className={`flex flex-row gap-2 ${
            type == PlaylistType.results ? "invisible" : "visible"
          }`}
        >
          <input
            className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
            type="text"
            placeholder="Playlist Name"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              searchPlaylist(setPlaylistItems, e.target.value);
            }}
          />
        </div>
        <div className="no-scrollbar h-96 overflow-y-auto rounded-lg">
          {playlistItems && <PlaylistItems items={playlistItems} />}
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
        {renderPlaylistCol(
          urlA,
          setUrlA,
          playlistItemsA,
          setPlaylistItemsA,
          PlaylistType.mine
        )}
        {renderPlaylistCol(
          urlB,
          setUrlB,
          playlistItemsB,
          setPlaylistItemsB,
          PlaylistType.other
        )}
        {renderPlaylistCol(
          "",
          () => {},
          playlistResults,
          setPlaylistResults,
          PlaylistType.results
        )}
      </div>
      <div className="flex flex-row my-6 gap-2">
        <GreenButton
          onClick={() => {
            console.log("==click sim");
            searchResults(urlA, urlB, "sim");
          }}
        >
          <p className="text-base font-semibold">Similarities</p>
        </GreenButton>
        <GreenButton
          onClick={() => {
            console.log("==click sim");
            searchResults(urlA, urlB, "diff");
          }}
        >
          <p className="text-base font-semibold">Differences</p>
        </GreenButton>
      </div>
    </div>
  );
};
