"use client";
import useStore from "@/lib/store";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SideBar = forwardRef<HTMLElement>((props, ref) => {
  const { sbActive, sbVisible, toggleSidebar } = useStore();

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
            <FaSearch />
            <input
              type="search"
              placeholder="Search station..."
              onChange={(e) => {
                useStore.setState({ searchText: e.target.value });
              }}
            />
          </div>
          <button className="common-btn" onClick={() => toggleSidebar(false)}>
            <FaTimes />
          </button>
        </header>

        <ul className="player-stations-list"></ul>

        <footer className="player-stations-footer flex-row flex-middle flex-stretch">
          <div className="flex-1 push-right"></div>
        </footer>
      </aside>
    </section>
  );
});

SideBar.displayName = "SidebarDrawer";
export default SideBar;
