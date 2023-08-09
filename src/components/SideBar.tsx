"use client";
import useStore from "@/lib/store";
import React, { forwardRef, useEffect, useState } from "react";
import { FaDownload, FaSearch, FaTimes } from "react-icons/fa";
import ListItem from "./ListItem";
import usePlayerStore from "@/lib/store";
import SortButtons from "./SortButtons";

const SideBar = forwardRef<HTMLElement>((props, ref) => {
  const sbActive = usePlayerStore((state) => state.sbActive);
  const sbVisible = usePlayerStore((state) => state.sbVisible);
  const { toggleSidebar, channelsList, saveFavorites } = useStore();

  const channelsListArray = channelsList();

  useEffect(() => {
    console.log("sidebar mounted");
    return () => {
      console.log("sidebar unmounted");
    };
  }, []);

  return (
    <section
      className={`player-stations ${sbActive ? "active" : ""} ${sbVisible ? "visible" : ""}`}
      onClick={() => toggleSidebar(false)}
      tabIndex={-1}
      ref={ref}>
      <aside className="player-stations-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* sidebar search */}
        <header className="player-stations-header flex-row flex-middle flex-stretch">
          <div className="form-input push-right">
            <FaSearch className="ico" />
            <input
              type="search"
              placeholder="Search station..."
              onChange={(e) => {
                useStore.setState({ searchText: e.target.value });
              }}
            />
          </div>
          <button className="common-btn focus-text" onClick={() => toggleSidebar(false)}>
            <FaTimes className="ico" />
          </button>
        </header>

        <ul className="player-stations-list">
          {channelsListArray.map((item) => (
            <ListItem key={item.id} {...item} />
          ))}
        </ul>

        <footer className="player-stations-footer flex-row flex-middle flex-stretch">
          <SortButtons />

          <div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                saveFavorites();
              }}
              title="Download Favorites PLS">
              <FaDownload className="ico text-faded" />
            </button>
          </div>
        </footer>
      </aside>
    </section>
  );
});

SideBar.displayName = "SidebarDrawer";
export default SideBar;
