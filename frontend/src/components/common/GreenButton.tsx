import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const GreenButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="btn btn-default bg-spotify-green px-4 py-2 rounded-3xl transform transition duration-500 hover:scale-110"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
