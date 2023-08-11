"use client";
import React, { useEffect } from "react";
import usePlayerStore from "@/lib/store";
import { BiLoaderAlt } from "react-icons/bi";
import { FaPlay, FaStop } from "react-icons/fa";

const PlayButton: React.FC = () => {
  const { loading, playing, togglePlay } = usePlayerStore((state) => ({
    loading: state.loading,
    playing: state.playing,
    togglePlay: state.togglePlay,
  }));

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
