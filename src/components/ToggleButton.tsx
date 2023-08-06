"use client";
import useStore from "@/lib/store";
import React from "react";
import { FaBars } from "react-icons/fa";

const ToggleButton: React.FC = () => {
  const { toggleSidebar } = useStore();
  return (
    <button
      className="text-nowrap common-btn focus-text"
      onClick={() => {
        toggleSidebar(true);
      }}>
      <FaBars />
    </button>
  );
};

export default ToggleButton;
