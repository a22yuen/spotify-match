interface Track {
  album: { images: { url: string }[] };
  name: string;
  artists: { name: string }[];
}

export const Track = (props: { track: Track }) => {
  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + "...";
    }
    return text;
  };
  return (
    <div className="flex flex-row px-2 py-2 shadow-xl bg-spotify-gray shadow-inner rounded gap-2">
      <img
        className="object-cover w-14 h-14 rounded shadow-2xl shadow-black"
        src={props?.track?.album?.images?.[0]?.url}
      />
      <div className="flex flex-col">
        <p className="flex flex-row font-semibold text-white text-lg w-full text-ellipsis overflow-hidden">
          {truncateText(props?.track?.name)}
        </p>
        <p className="text-white text-base">
          {truncateText(props?.track?.artists[0].name)}
        </p>
      </div>
    </div>
  );
};
