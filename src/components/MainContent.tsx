"use client";
import { Channel } from "@/interfaces/channelTypes";
import useStore from "@/lib/store";
import audio from "@/util/audio";
import soma from "@/util/soma";
import React from "react";

type Props = {};

let ch: Channel[];
async function getData() {
  const data = await soma.getChannels((err, list) => {
    console.log("channel list", list);
    ch = list;
  });
}

async function getSongs() {
  const data = await soma.getSongs(ch[1], (err, list) => {
    console.log("song list", list);
  });
}

const MainContent = (props: Props) => {
  const {
    setError,
    hasError,
    clearError,
    flushErrors,
    saveFavorites,
    loadFavorites,
    errors,
    channel,
    channels,
    toggleFavorite,
    favorites,
    channelsList,
    songsList,
    getChannels,
    updateCurrentChannel,
    playChannel,
  } = useStore();
  return (
    <div className="flex-a">
      <section>
        <h5>Test Data</h5>
        <button className="cta-btn" onClick={getData}>
          Get Data
        </button>
        <button className="cta-btn" onClick={getSongs}>
          Get Songs
        </button>
        <button className="cta-btn" onClick={() => getChannels(true)}>
          Get Channels
        </button>
      </section>

      <section>
        <h5>Test Errors</h5>
        <button
          className="cta-btn"
          onClick={() => {
            console.log("all errors", errors);
          }}>
          Show error array
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            let x = Math.random();
            setError(`test-${x}`, `testing error data ${x}`);
            setError(`test`, `testing error data 0`);
            console.log("all errors", errors);
          }}>
          Set error
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            console.log("checking for error", hasError("test"));
          }}>
          check for errors
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            console.log('Clearing "test" error');
            clearError("test");
            console.log("all errors", errors);
          }}>
          Clear a Error
        </button>

        <button
          className="cta-btn"
          onClick={() => {
            flushErrors();
            console.log("all errors", errors);
          }}>
          clear all errors
        </button>
      </section>

      <section>
        <h5>Favorites test</h5>
        <button className="cta-btn" onClick={() => console.log(favorites)}>
          show favs
        </button>
        <button className="cta-btn" onClick={() => loadFavorites()}>
          load favs
        </button>
        <button className="cta-btn" onClick={() => toggleFavorite("7souls", true)}>
          toggle favs
        </button>
        <button className="cta-btn" onClick={() => saveFavorites()}>
          save favs
        </button>
      </section>

      <section>
        <h5>List data</h5>
        <button
          className="cta-btn"
          onClick={() => {
            console.log("channel list", channelsList());
          }}>
          Trigger Channel Listing
        </button>
        <button className="cta-btn" onClick={() => updateCurrentChannel()}>
          update Current Channel
        </button>
        <button className="cta-btn" onClick={() => console.log(channel)}>
          Channel
        </button>
      </section>

      <section>
        <h5>Audio Test</h5>
        <button
          className="cta-btn"
          onClick={() => {
            audio.setupAudio();
          }}>
          setup Audio
        </button>
        <button
          className="cta-btn"
          onClick={() => audio.playSource("https://ice1.somafm.com/groovesalad-128-mp3")}>
          play sources
        </button>
        <button className="cta-btn" onClick={() => playChannel(channel)}>
          Channel
        </button>
      </section>
    </div>
  );
};

export default MainContent;
