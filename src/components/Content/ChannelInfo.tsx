"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import usePlayerStore from "@/lib/store";
import FavoriteButton from "../SideBar/FavoriteButton";
import SongList from "./SongList";
import { Channel } from "@/interfaces/channelTypes";
import { BsCollectionFill } from "react-icons/bs";
import { FaEarthAmericas } from "react-icons/fa6";
import { toCommas, toText } from "@/util/filters";
import { FaDownload, FaHeadphones, FaPlay } from "react-icons/fa";

interface ChannelInfoProps {
  channel: Channel;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channel }) => {
  const { track, hasSongs } = usePlayerStore((state) => ({
    track: state.track,
    hasSongs: state.hasSongs,
  }));

  return (
    <section className="player-channel flex-1" key={channel.id}>
      <div className="flex-autorow flex-top flex-stretch">
        {/* station details */}
        <div className="flex-item flex-1">
          {/* station */}
          <div className="push-bottom">
            <div className="flex-row flex-middle pad-bottom">
              <div className="fx fx-drop-in fx-delay-1">
                <Image
                  className="img-round"
                  src={channel.largeimage}
                  width={80}
                  height={80}
                  alt={channel.title}
                />
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
          {/* description */}
          <div className="push-bottom pad-bottom fx fx-slide-up fx-delay-3">
            <div className="push-bottom">
              <span className="text-secondary">Mixed by DJ {toText(channel.dj, "N/A")}</span>
              <br />
              <span className="text-bright text-capitalize">{channel.title}</span>
              {" - "}
              <span className="text-bright text-capitalize">
                {toText(channel.genre, "Station")}
              </span>
              <br />
              <span>{channel.description}</span>
            </div>
            <div className="flex-row flex-middle">
              {channel.infourl && (
                <div className="fx fx-slide-up fx-delay-2 push-right">
                  <Link
                    href={channel.infourl}
                    title="Channel Page"
                    target="_blank"
                    className="cta-btn text-nowrap focus-box">
                    <FaEarthAmericas className="ico" />
                    &nbsp; Webpage
                  </Link>
                </div>
              )}
              {channel.plsfile && (
                <div className="fx fx-slide-up fx-delay-3 push-right">
                  <Link
                    href={channel.plsfile}
                    title="Download PLS"
                    target="_blank"
                    className="cta-btn text-nowrap focus-box">
                    <FaDownload className="ico" />
                    &nbsp; PLS
                  </Link>
                </div>
              )}
              {channel.twitter && (
                <div className="fx fx-slide-up fx-delay-4 push-right">
                  <Link
                    href={channel.twitter}
                    title="Twitter page"
                    target="_blank"
                    className="cta-btn text-nowrap focus-box">
                    <FaDownload className="ico" />
                    &nbsp; Twitter
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* heading */}
          <div className="flex-row flex-middle push-bottom">
            <div className="push-right">
              <h5 className="text-nowrap fx fx-fade-in fx-delay-2">
                <FaPlay className="ico" />
                &nbsp; Now Playing
              </h5>
            </div>
            {channel.listeners && (
              <div className="fx fx-slide-left fx-delay-3">
                <FaHeadphones className="ico" />
                &nbsp; {toCommas(channel.listeners, 0)} listening
              </div>
            )}
          </div>

          {/* current track */}
          {track.date && (
            <div className="card fx fx-slide-left fx-delay-4">
              <div>
                <span className="text-secondary">{toText(track.title, "N/A")}</span>
              </div>
              <div>
                <span className="text-faded">From:</span>&nbsp;
                <span className="text-bright">{toText(track.album, "N/A")}</span>
              </div>
              <div>
                <span className="text-faded">By:</span>&nbsp;
                <span className="text-default">{toText(track.artist, "N/A")}</span>
              </div>
            </div>
          )}
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

          {hasSongs() && <SongList />}
        </div>
      </div>
    </section>
  );
};

export default ChannelInfo;
