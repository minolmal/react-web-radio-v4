"use client";
import Link from "next/link";
import React, { useRef } from "react";
import "@/styles/app.scss";
import MainContent from "@/components/MainContent";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";
import useStore from "@/lib/store";
import { FaHeadphones, FaGithub, FaCodepen, FaBars } from "react-icons/fa";

export default function Home(): React.ReactNode {
  const sidebarDrawer = useRef<HTMLElement>(null);
  const { toggleSidebar } = useStore();

  return (
    <>
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
          <MainContent />
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
    </>
  );
}
