import React from "react";
import logo from "../../../public/images/Spotify_icon_blend.png";

export const Header = () => {
  console.log("==logo", logo);
  return (
    <div className="flex flex-row justify-center items-center transform transition duration-500 hover:scale-110">
      <img className="h-16 w-16 mr-4 mt-1" src={logo.src} />
      <p className="text-6xl font-semibold text-spotify-green">
        Spotify
        <span className="text-pink-500">{" Match"}</span>
      </p>
    </div>
  );
};
