"use client";
import React from "react";
import { toText } from "@/util/filters";
import usePlayerStore from "@/lib/store";

const SongList: React.FC = () => {
  const { songsList } = usePlayerStore();
  const list = songsList();

  return (
    <ul className="player-tracklist push-bottom">
      {list.map((s, i) => (
        <li className={`card fx fx-slide-left fx-delay-${i + 4}`} key={s.date}>
          <div>
            <span className="text-secondary">{toText(s.title, "N/A")}</span>
          </div>
          <div>
            <span className="text-faded">From:</span>&nbsp;
            <span className="text-bright">{toText(s.album, "N/A")}</span>
          </div>
          <div>
            <span className="text-faded">By:</span>&nbsp;
            <span className="text-default">{toText(s.artist, "N/A")}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SongList;
