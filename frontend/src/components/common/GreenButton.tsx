import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const GreenButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-default px-4 py-2 rounded-3xl ${
        disabled
          ? "bg-spotify-gray"
          : "bg-spotify-green transform transition duration-200 hover:scale-110 active:bg-pink-500"
      }`}
      onClick={
        disabled
          ? () => {
              console.log("==disabled");
            }
          : onClick
      }
    >
      {children}
    </button>
  );
};
