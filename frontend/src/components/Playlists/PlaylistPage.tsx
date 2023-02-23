import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
import { AppContext } from "../../../context/AppContext";
import { PlaylistItems } from "./PlayListItems";
import {
  fetchPlaylistResults,
  fetchPlaylistItems,
  fetchUserData,
  createPlaylist,
} from "../../api/spotify";
import { UserHeader } from "../common/UserHeader";
import { MdCancel } from "react-icons/md";

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
  const [resultName, setResultName] = useState("");
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

  const generatePlaylist = async (playlistItems: any, name: string) => {
    try {
      const response = await createPlaylist(
        playlistItems,
        user.id,
        name,
        token
      );
      console.log("==response", response);
      return;
    } catch (e) {
      console.log("Invalid result playlist URL");
      return;
    }
  };

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
        <div className="flex flex-row gap-2">
          <input
            className="rounded text-white bg-black px-2 py-1 border-2 border-white w-full"
            type="text"
            placeholder={
              type == PlaylistType.results
                ? "New Playlist Name"
                : "Playlist URL"
            }
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (type != PlaylistType.results) {
                searchPlaylist(setPlaylistItems, e.target.value);
              }
            }}
          />
        </div>
        <div className="no-scrollbar h-full overflow-y-auto rounded-lg">
          {playlistItems ? (
            <PlaylistItems items={playlistItems} />
          ) : (
            <div className="flex flex-col items-center pt-6">
              <div className="flex flex-row text-lg text-white">
                No playlist found
              </div>
              <MdCancel className="text-4xl text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // return (
  //   <div className="flex flex-col h-screen">
  //     <div className="h-20 bg-gray-300">Fixed height item 1</div>
  //     <div className="flex-grow bg-gray-500">Expandable item 2</div>
  //     <div className="h-20 bg-gray-300">Fixed height item 3</div>
  //   </div>
  // );

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-black via-black to-background-pink items-center">
      <div className="flex h-8 w-full bg-pink" />
      <UserHeader />
      <div className="text-white font-semibold py-2 text-lg mt-2">
        {" "}
        Share songs with your friends{" "}
      </div>
      <div className="text-white flex flex-row gap-2">
        {" "}
        Compare your playlist with a friend, and find out which songs you share
        or don't{" "}
      </div>
      {
        //3 column div
        // test commit
      }
      <div className="flex flex-grow w-11/12 h-1/3 px-32 gap-6 justify-between">
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
          resultName,
          setResultName,
          playlistResults,
          setPlaylistResults,
          PlaylistType.results
        )}
        <div className="mt-12">
          <GreenButton
            disabled={
              (playlistResults && playlistResults.length == 0) ||
              resultName == ""
            }
            onClick={() => {
              console.log("==generate playlist");
              generatePlaylist(playlistResults, resultName);
            }}
          >
            <p className="flex flex-row w-24 text-base font-semibold">
              Make Playlist
            </p>
          </GreenButton>
        </div>
      </div>
      <div className="flex flex-row my-6 gap-4">
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
