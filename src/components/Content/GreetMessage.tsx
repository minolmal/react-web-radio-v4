"use client";
import React from "react";
import usePlayerStore from "@/lib/store";
import { FaHeadphones } from "react-icons/fa";

const GreetMessage: React.FC = () => {
  const toggleSidebar = usePlayerStore((state) => state.toggleSidebar);
  return (
    <section className="player-greet">
      <div className="fx fx-slide-left push-bottom">
        <h1>Pick a Station</h1>
      </div>
      <div className="fx fx-slide-left fx-delay-1 push-bottom">
        This is a music streaming player for the channels provided by SomaFM.com. Just pick a
        station from the sidebar to the right to start listening.
      </div>
      <div className="fx fx-slide-up fx-delay-2 pad-top">
        <button className="cta-btn focus-box" type="button" onClick={() => toggleSidebar(true)}>
          <FaHeadphones className="ico" />
          &nbsp; View Stations
        </button>
      </div>
    </section>
  );
};

export default GreetMessage;
