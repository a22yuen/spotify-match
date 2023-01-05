import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import logo from "../../../public/images/Spotify_icon_blend.png";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi"
import { useRouter } from "next/router";

export const UserHeader = () => {
  const { user } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  const router = useRouter();

  const renderLogo = () => {
    return (
      <div className="flex flex-row justify-center items-center transform transition duration-500 hover:scale-110">
        <img className="h-12 w-12 mr-4 mt-1" src={logo.src} />
        <p className="text-3xl font-semibold text-spotify-green">
          Spotify
          <span className="text-pink-500">{" Match"}</span>
        </p>
      </div>
    );
  };

  useEffect(() => {
    console.log("==dropdownOpen", dropdownOpen)
  }, [dropdownOpen])

  const toggleDropdown = () => {
    const open = dropdownOpen
    console.log("==open", open)
    setDropdownOpen(!open)
  }

  const logOut = () => {
    localStorage.setItem('token', "")
    router.push("/")
  }

  const renderDropdown = () => {
    return <div className="flex flex-col bg-black rounded border-white border-2 z-10 absolute right-12">
        <div className="flex flex-row px-2 items-center gap-2 cursor-pointer" onClick={() => {
            logOut()
        }}>
            <BiLogOut color={"white"} size={24}/>
        <p className="text-white text-lg font-semi-bold">Logout</p>
        </div>

    </div>
  }
  const renderUser = () => {
    return (
      <div className="flex flex-row items-center">
        <img
          className="rounded-full h-12 mr-2"
          src={
            user?.images?.length > 0
              ? user?.images[0]?.url
              : "https://api-private.atlassian.com/users/69c12083c9ab17841e5239a7a95ce41f/avatar"
          }
        />
        <div className="flex flex-col mr-2">
          <p className="text-white text-lg font-semibold">
            {user?.display_name ?? "Logged Out User"}
          </p>
        </div>
        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
                console.log("asd")
                toggleDropdown()
            }}
          >
            <FiSettings color="white" size={28} />
          </div>
          {dropdownOpen && renderDropdown()}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full bg-black items-center px-12 justify-between">
      {renderLogo()}
      {renderUser()}
    </div>
  );
};
