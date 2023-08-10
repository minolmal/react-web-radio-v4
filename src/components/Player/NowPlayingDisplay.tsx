"use client";
import usePlayerStore from "@/lib/store";
import React from "react";

const NowPlayingDisplay: React.FC = () => {
  const { channel, timeDisplay, hasChannel } = usePlayerStore((state) => ({
    channel: state.channel,
    timeDisplay: state.timeDisplay,
    hasChannel: state.hasChannel,
  }));
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
