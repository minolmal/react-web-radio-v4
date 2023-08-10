"use client";
import React from "react";
import Image from "next/image";
import usePlayerStore from "@/lib/store";
import FavoriteButton from "../SideBar/FavoriteButton";
import { Channel } from "@/interfaces/channelTypes";
import { BsCollectionFill } from "react-icons/bs";
import SongList from "./SongList";

interface ChannelInfoProps {
  channel: Channel;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channel }) => {
  const hasSongs = usePlayerStore((state) => state.hasSongs);

  return (
    <section className="player-channel flex-1" key={channel.id}>
      <div className="flex-autorow flex-top flex-stretch">
        {/* station details */}
        <div className="flex-item flex-1">
          <div className="push-bottom">
            <div className="flex-row flex-middle pad-bottom">
              <div className="fx fx-drop-in fx-delay-1">
                <Image src={channel.largeimage} width={80} height={80} alt={channel.title} />
              </div>
              <div className="pad-left">
                <h3 className="text-clip fx fx-fade-in fx-delay-2">
                  <span>{channel.title}</span>
                </h3>
                <div className="fx fx-fade-in fx-delay-3">
                  <FavoriteButton id={channel.id} active={channel.favorite} text="Favorite" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* songs list */}
        <div className="flex-item flex-1">
          <div className="push-bottom">
            <h5 className="text-nowrap fx fx-fade-in fx-delay-1">
              <BsCollectionFill className="ico" /> &nbsp; Recent Tracks
            </h5>
          </div>

          {!hasSongs() && (
            <div className="card push-bottom fx fx-slide-left fx-delay-4">
              There are no songs loaded yet for this station.
            </div>
          )}
        </div>

        {hasSongs() && <SongList />}
      </div>
    </section>
  );
};

export default ChannelInfo;
