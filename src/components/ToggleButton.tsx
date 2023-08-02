"use client";
import React from "react";
import { FaBars } from "react-icons/fa";

interface ToggleButtonProps extends HTMLButtonElement {}

const ToggleButton: React.FC = () => {
  return (
    <button className="text-nowrap common-btn">
      <FaBars />
    </button>
  );
};

export default ToggleButton;
