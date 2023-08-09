"use client";
import usePlayerStore from "@/lib/store";
import React from "react";
import SliderControl from "./SliderControl";
import NowPlayingDisplay from "./NowPlayingDisplay";
import PlayButton from "./PlayButton";

const Player: React.FC = () => {
  const canPlay = usePlayerStore((state) => state.canPlay);
  return (
    <section
      className={`player-controls flex-row flex-middle push-right ${!canPlay() ? "disabled" : ""}`}>
      <PlayButton />
      <SliderControl />
      <NowPlayingDisplay />
    </section>
  );
};

export default Player;
