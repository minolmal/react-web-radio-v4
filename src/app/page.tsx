"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Player from "@/components/Player/Player";
import SideBar from "@/components/SideBar/SideBar";
import ChannelInfo from "@/components/Content/ChannelInfo";
import MainContent from "@/components/MainContent";
import ErrorMessage from "@/components/Content/ErrorMessage";
import GreetMessage from "@/components/Content/GreetMessage";
import usePlayerStore from "@/lib/store";

import { IconContext } from "react-icons";
import { FaHeadphones, FaGithub, FaCodepen, FaBars } from "react-icons/fa";

export default function Home(): React.ReactNode {
  const sidebarDrawer = useRef<HTMLElement>(null);
  const { channel, toggleSidebar, hasChannel, hasErrors } = usePlayerStore((state) => ({
    channel: state.channel,
    toggleSidebar: state.toggleSidebar,
    hasChannel: state.hasChannel,
    hasErrors: state.hasErrors,
  }));

  const {
    loadSortOptions,
    loadFavorites,
    loadVolume,
    setupEvents,
    getChannels,
    setupMaintenance,
    initPlayer,
    closeAudio,
    clearTimers,
  } = usePlayerStore();

  useEffect(() => {
    console.log("app mounted");
    loadSortOptions();
    loadFavorites();
    loadVolume();
    setupEvents();
    getChannels(true);
    setupMaintenance();
    initPlayer();

    return () => {
      console.log("app unmounted");
      closeAudio();
      clearTimers();
    };
  }, [
    clearTimers,
    closeAudio,
    getChannels,
    initPlayer,
    loadFavorites,
    loadSortOptions,
    loadVolume,
    setupEvents,
    setupMaintenance,
  ]);

  return (
    <>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <section className="player-layout">
          <header className="player-header flex-row flex-middle flex-stretch">
            <h2 className="text-clip flex-1">
              <FaHeadphones />
              <span> Soma FM Player</span>
            </h2>
            <button
              className="text-nowrap common-btn focus-text"
              onClick={() => {
                toggleSidebar(true);
                sidebarDrawer.current?.focus();
              }}>
              <FaBars />
            </button>
          </header>

          <main className="player-content flex-row">
            {/* <MainContent /> */}
            {!hasChannel() && !hasErrors() && <GreetMessage />}
            {hasChannel() && !hasErrors() && <ChannelInfo channel={channel} />}
            {hasErrors() && <ErrorMessage />}
          </main>

          <footer className="player-footer flex-row flex-middle flex-space">
            <Player />

            <section className="player-links text-nowrap">
              <Link
                className="common-btn text-faded"
                href="https://github.com/rainner/soma-fm-player"
                title="View on Github"
                target="_blank">
                <FaGithub />
              </Link>
              &nbsp;
              <Link
                className="common-btn text-faded"
                href="https://codepen.io/rainner"
                title="Codepen Projects"
                target="_blank">
                <FaCodepen />
              </Link>
            </section>
          </footer>
        </section>

        <SideBar ref={sidebarDrawer} />
      </IconContext.Provider>
    </>
  );
}
