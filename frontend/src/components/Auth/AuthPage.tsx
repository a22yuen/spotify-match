import React, { useEffect, useState, useContext } from "react";
import { GreenButton } from "../common/GreenButton";
import { useRouter } from "next/router";
import loadingGif from "../../../public/images/green-loader-2.gif";
import { AppContext } from "../../../context/AppContext";

export const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.token) {
      const token = router?.query?.token.toString();
      localStorage.setItem("token", token);
    }
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  }, [router]);

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-black via-black to-background-green items-center justify-center">
      <p className="text-white font-semibold animate-pulse">
        Logging you in ...
      </p>
      <img className="h-20" src={loadingGif.src} />
    </div>
  );
};
