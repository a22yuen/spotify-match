interface Track {
  album: { images: { url: string }[] };
  name: string;
  artists: { name: string }[];
}

export const Track = (props: { track: Track }) => {
  return (
    <div className="flex flex-row px-2 py-2 bg-blue-500 rounded gap-2">
      <img
        className="object-cover w-14 h-14 border-gray border-2 rounded"
        src={props?.track?.album?.images?.[0]?.url}
      />
      <div className="flex flex-col">
        <p className="text-white text-lg">{props?.track?.name}</p>
        <p className="text-white text-base">{props?.track?.artists[0].name}</p>
      </div>
    </div>
  );
};
