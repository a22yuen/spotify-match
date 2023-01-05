import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { fetchUserData } from "../../api/spotify";
import { UserHeader } from "../common/UserHeader";

export const HomePage = () => {
  const { user, setUser } = useContext(AppContext);
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token){
        console.log("==fetching")
        setUser(fetchUserData(token))
    }
  }, []);
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-green items-center justify-center">
        <p className="text-white">sdssssas</p>
        <UserHeader/>
    </div>
  );
};
