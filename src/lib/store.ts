import { PlayerActions, PlayerState, initialState } from "@/interfaces/playerTypes";
import { create } from "zustand";
import utils from "@/util/utils";

interface IStore extends PlayerState, PlayerActions {}
const useStore = create<IStore>()((set, get) => ({
  ...initialState,
  channelsList() {
    let list = this.channels.slice();
    let search = this.searchText
      .replace(/[^\w\s\-]+/g, "")
      .replace(/[\r\s\t\n]+/g, "")
      .trim();

    if (search && search.length > 1) {
      list = utils.search(list, "title", search);
    }

    if (this.sortParam) {
      list = utils.sort(list, this.sortParam, this.sortOrder, false);
    }

    if (this.channel.id) {
      list = list.map((i) => {
        i.active = this.channel.id === i.id ? true : false;
        return i;
      });
    }
    return list;
  },
  songsList() {
    let list = this.songs.slice();
    return list;
  },
  sortLabel() {
    switch (this.sortParam) {
      case "title":
        return "Station Name";
      case "listeners":
        return "Listeners Count";
      case "favorite":
        return "Saved Favorites";
      case "genre":
        return "Music Genre";
    }
  },
  canPlay() {
    return this.channel.id && !this.loading ? true : false;
  },
  hasChannel() {
    return this.channel.id ? true : false;
  },
  hasSongs() {
    return this.songs.length ? true : false;
  },
  hasErrors() {
    if (this.errors.support || this.errors.stream) return true;
    if (this.errors.channels && !this.channels.length) return true;
    return false;
  },
}));
