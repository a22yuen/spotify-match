import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
import { useRouter } from "next/router";
import loadingGif from "../../../public/images/green-loader-2.gif"
import { AppContext } from "../../../context/AppContext";

export const AuthPage = () => {

    const router = useRouter();
    const { token, setToken } = useContext(AppContext) 
    useEffect(() => {
      if (router?.query?.token) {
        console.log(typeof router?.query?.token);
        setToken(router.query.token.toString()) // query should be a string already but this fixes ts errors
        localStorage.setItem("token", router?.query?.token.toString())
        console.log("==router", router.query.token);
      }
    }, [router]);

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-green items-center justify-center">
        <p className="text-white font-semibold animate-pulse">Logging you in ...  {token}</p>
        <img className="h-20" src={loadingGif.src}/>
    </div>
  );
};
