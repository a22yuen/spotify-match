interface Item {
  name: string;
  artist: string;
  albumArt: string;
}

export const Track = (props: { item: Item }) => {
  return (
    <div className="flex flex-row px-2 py-2 bg-blue-500 rounded gap-2">
      <img
        className="object-cover w-14 h-14 border-gray border-2 rounded"
        src={props?.item?.albumArt}
      />
      <div className="flex flex-col">
        <p className="text-white text-lg">{props?.item?.name}</p>
        <p className="text-white text-base">{props?.item?.artist}</p>
      </div>
    </div>
  );
};
