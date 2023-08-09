"use client";
import React from "react";
import usePlayerStore from "@/lib/store";
import { BiLoaderAlt } from "react-icons/bi";
import { FaPlay, FaStop } from "react-icons/fa";

const PlayButton: React.FC = () => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const loading = usePlayerStore((state) => state.loading);
  const playing = usePlayerStore((state) => state.playing);

  return (
    <button className="common-btn focus-text" type="button" onClick={(e) => togglePlay(e)}>
      {loading ? (
        <BiLoaderAlt className="ico fx fx-spin-right" />
      ) : playing ? (
        <FaStop className="ico fx fx-drop-in" />
      ) : (
        <FaPlay className="ico fx fx-drop-in" />
      )}
    </button>
  );
};

export default PlayButton;
