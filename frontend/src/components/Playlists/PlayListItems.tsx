import React, { useEffect } from "react";

interface Item {
  track: {
    album: { images: { url: string }[] };
    artists: { name: string }[];
    name: string;
  };
}
import { Track } from "./Track";

export const PlaylistItems = (props: { items: Item[] }) => {

  useEffect(() => {
    console.log("==items", props?.items)
  }, [props?.items])
  return (
    <div className="flex flex-col py-4 px-4 gap-2 bg-black rounded-lg">
      {props?.items?.map((item, index) => {
        return <Track track={item.track} key={index} />;
      })}
    </div>
  );
};
