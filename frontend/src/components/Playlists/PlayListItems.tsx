interface Item {
  name: string;
  artist: string;
  albumArt: string;
}
import { Track } from "./Track";

export const PlaylistItems = (props: { items: Item[] }) => {
  return (
    <div className="flex flex-col py-4 px-4 gap-2 bg-black rounded-lg">
      {props?.items?.map((item, index) => {
        return <Track item={item} key={index} />;
      })}
    </div>
  );
};
