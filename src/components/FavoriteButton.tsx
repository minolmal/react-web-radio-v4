"use client";
import useStore from "@/lib/store";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  id: string;
  text?: string;
  active: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, text, active }) => {
  const [activeState, setActiveState] = useState(active);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    toggleFavorite(id, activeState);
  }, [activeState, id, toggleFavorite]);

  return (
    <button
      className="hover-text focus-text"
      title="Toggle save favorite station"
      onClick={(e) => {
        e.stopPropagation();
        setActiveState((prev) => !prev);
      }}>
      <span>
        {activeState ? (
          <i className="ico text-primary fx fx-drop-in">
            <FaHeart />
          </i>
        ) : (
          <i className="ico fx fx-drop-in">
            <FaRegHeart />
          </i>
        )}
      </span>
      <span>&nbsp;{text}</span>
    </button>
  );
};

export default FavoriteButton;
