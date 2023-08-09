import usePlayerStore from "@/lib/store";
import React from "react";
import { FaHeadphones, FaHeart, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LuRadioTower } from "react-icons/lu";
import { BsCollectionPlay } from "react-icons/bs";

type Props = {};

const SortButtons = (props: Props) => {
  const { sortLabel } = usePlayerStore();
  const { sortOrder } = usePlayerStore();
  const { sortBy, toggleSortOrder } = usePlayerStore();
  return (
    <div className="flex-1 push-right">
      <span onClick={() => toggleSortOrder()} className="ico clickable">
        {sortOrder === "asc" ? (
          <FaSortAlphaDown className="ico text-faded" />
        ) : (
          <FaSortAlphaUp className="ico text-faded" />
        )}
        &nbsp;
      </span>
      <span className="text-faded">Sort: &nbsp;</span>
      <span className="text-bright popover">
        <span className="clickable">{sortLabel()}</span>
        <span className="popover-box popover-top">
          <button type="button" onClick={() => sortBy("title", "asc")}>
            <LuRadioTower className="ico text-faded" /> &nbsp; Station Name
          </button>
          <button type="button" onClick={() => sortBy("listeners", "desc")}>
            <FaHeadphones className="ico text-faded" /> &nbsp; Listeners Count
          </button>
          <button type="button" onClick={() => sortBy("favorite", "desc")}>
            <FaHeart className="ico text-faded" /> &nbsp; Saved Favorites
          </button>
          <button type="button" onClick={() => sortBy("genre", "asc")}>
            <BsCollectionPlay className="ico text-faded" /> &nbsp; Music Genre
          </button>
        </span>
      </span>
    </div>
  );
};

export default SortButtons;
