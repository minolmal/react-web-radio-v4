"use client";
import React, { useEffect } from "react";
import usePlayerStore from "@/lib/store";

const NowPlayingDisplay: React.FC = () => {
  const { channel, timeDisplay, playing, hasChannel, startClock, stopClock } = usePlayerStore(
    (state) => ({
      channel: state.channel,
      timeDisplay: state.timeDisplay,
      playing: state.playing,
      hasChannel: state.hasChannel,
      startClock: state.startClock,
      stopClock: state.stopClock,
    })
  );

  useEffect(() => {
    if (playing) {
      startClock();
    } else {
      stopClock();
    }
  }, [playing, startClock, stopClock]);
  return (
    <div className="text-clip push-left">
      <span>{timeDisplay}</span>
      {hasChannel() ? (
        <>
          <span className="text-faded">&nbsp;|&nbsp;</span>
          <span className="fx fx-fade-in fx-delay-1" key={channel.id}>
            {channel.title}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default NowPlayingDisplay;
