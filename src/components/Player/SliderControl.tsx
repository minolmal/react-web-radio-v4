"use client";
import usePlayerStore from "@/lib/store";
import audio from "@/util/audio";
import React, { useEffect, useState } from "react";
import { FaVolumeDown, FaVolumeOff, FaVolumeUp } from "react-icons/fa";

const SliderControl = () => {
  const { volume, saveVolume } = usePlayerStore((state) => ({
    volume: state.volume,
    saveVolume: state.saveVolume,
  }));
  const [sliderValue, setSliderValue] = useState(volume);

  useEffect(() => {
    audio.setVolume(sliderValue);
    saveVolume();
  }, [saveVolume, sliderValue]);

  return (
    <div className="form-slider push-left">
      <span>
        {sliderValue == 0 ? (
          <FaVolumeOff className="ico" />
        ) : sliderValue >= 50 ? (
          <FaVolumeUp className="ico" />
        ) : sliderValue > 0 && sliderValue < 50 ? (
          <FaVolumeDown className="ico" />
        ) : null}
      </span>
      <input
        // className="common-slider"
        type="range"
        min={0}
        max={100}
        step={1}
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.valueAsNumber)}
      />
    </div>
  );
};

export default SliderControl;
