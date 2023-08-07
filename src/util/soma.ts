/**
 * Soma-FM API handler
 */

import { Channel, tSongs } from "@/interfaces/channelTypes";

const soma = {
  /**
   * Get Channels - get channel data from SomaFm API
   * @param callback callback function to use with fetched data
   * @returns Promise object
   */
  async getChannels(callback: (_error: string | null, _list: Channel[]) => any) {
    const apiURL = "https://somafm.com/channels.json";
    const errorString =
      "There was a problem fetching the latest list of music channels from SomaFM.";

    return fetch(apiURL, { next: { revalidate: 3600 } }) // TODO:reduce revalidate in production
      .then((res) => res.json())
      .then((data) => {
        console.log("data",data.channels);
        const list = this._parseChannels(data.channels);
        if (!list.length) return callback(errorString, []);
        return callback(null, list);
      })
      .catch((e: Error) => {
        return callback(errorString + String(e.message || ""), []);
      });
  },
  /**
   * fetch songs for a channel
   * @param channel selected channel
   * @param callback callback function to use with fetched data
   * @returns Promise object
   */
  async getSongs(channel: Channel, callback: (_error: string | null, _list: tSongs[]) => any) {
    const apiURL = channel.songsurl || "";
    const title = channel.title || "...";
    const errorString = `There was a problem loading the list of songs for channel ${title} from SomaFM.`;

    return fetch(apiURL, { next: { revalidate: 3600 } }) // TODO:reduce revalidate in production
      .then((res) => res.json())
      .then((data) => {
        if (!data.songs) return callback(errorString, []);
        return callback(null, data.songs);
      })
      .catch((e: Error) => {
        return callback(errorString + String(e.message || ""), []);
      });
  },
  /**
   * Parse Channels - parse channels list from api response
   * @param channels fetched array of channels
   * @returns structured list of channels for internal use
   */
  _parseChannels(channels: Channel[]) {
    let output = [];
    if (Array.isArray(channels)) {
      for (let c of channels) {
        if (!Array.isArray(c.playlists)) continue;

        c.plsfile = "https://api.somafm.com/" + c.id + ".pls";
        c.mp3file = "https://ice1.somafm.com/" + c.id + "-128-mp3";
        c.songsurl = "https://somafm.com/songs/" + c.id + ".json";
        c.infourl = "https://somafm.com/" + c.id + "/";
        c.twitter = c.twitter ? "https://twitter.com/@" + c.twitter : "";
        c.route = "/channel/" + c.id;
        c.listeners = c.listeners | 0;
        c.updated = c.updated | 0;
        c.favorite = false;
        c.active = false;
        output.push(c);
      }
    }
    return output;
  },
};

export default soma;
