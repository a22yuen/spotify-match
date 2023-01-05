import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { fetchUserData } from "../../api/spotify";
import { UserHeader } from "../common/UserHeader";

export const HomePage = () => {
  const { user, setUser } = useContext(AppContext);

  const fetchUser = async (token: string) => {
    const response = await fetchUserData(token);
    setUser(response);
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token){
      fetchUser(token)
    }
  }, [])
  
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-green items-center justify-center">
        <UserHeader/>
    </div>
  );
};
