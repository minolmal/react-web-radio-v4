"use client";
import React from "react";
import Image from "next/image";
import useStore from "@/lib/store";
import { Channel } from "@/interfaces/channelTypes";
import FavoriteButton from "./FavoriteButton";
import { FaHeadphones } from "react-icons/fa";
import { toCommas, toText } from "@/util/filters";

const ListItem: React.FC<Channel> = (props) => {
  const selectChannel = useStore((state) => state.selectChannel);
  return (
    <li
      className={`player-stations-list-item flex-row flex-top flex-stretch ${
        props.active ? "active" : ""
      }`}
      tabIndex={0}
      onClick={() => selectChannel(props, true)}
      title={props.title}>
      <figure className="push-right">
        <Image
          // rel="preload"
          className="img-round"
          width={70}
          height={70}
          src={props.largeimage}
          alt={props.title}
        />
      </figure>
      <aside className="flex-1">
        <div className="flex-row flex-middle flex-space">
          <div className="player-stations-list-title text-bright text-clip">{props.title}</div>
          <div className="text-nowrap">
            <span className="text-secondary">
              <FaHeadphones className="ico" />
              &nbsp; {toCommas(props.listeners, 0)} &nbsp;
            </span>
            <FavoriteButton id={props.id} active={props.favorite} />
          </div>
        </div>
        <div className="text-small">
          <span className="text-faded text-uppercase text-small">{toText(props.genre)}</span> <br />
          {props.description}
        </div>
      </aside>
    </li>
  );
};

export default ListItem;
