import { PlayerActions, PlayerState, initialState } from "@/interfaces/playerTypes";
import { create } from "zustand";
import utils from "@/util/utils";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { useRef } from "react";
import soma from "@/util/soma";
import { IErrors } from "@/interfaces/channelTypes";

interface IStore extends PlayerState, PlayerActions {}
const useStore = create<IStore>()((set, get) => ({
  ...initialState,
  // channelsList() {
  //   let list = this.channels.slice();
  //   let search = this.searchText
  //     .replace(/[^\w\s\-]+/g, "")
  //     .replace(/[\r\s\t\n]+/g, "")
  //     .trim();

  //   if (search && search.length > 1) {
  //     list = utils.search(list, "title", search);
  //   }

  //   if (this.sortParam) {
  //     list = utils.sort(list, this.sortParam, this.sortOrder, false);
  //   }

  //   if (this.channel.id) {
  //     list = list.map((i) => {
  //       i.active = this.channel.id === i.id ? true : false;
  //       return i;
  //     });
  //   }
  //   return list;
  // },
  // songsList() {
  //   let list = this.songs.slice();
  //   return list;
  // },
  // sortLabel() {
  //   switch (this.sortParam) {
  //     case "title":
  //       return "Station Name";
  //     case "listeners":
  //       return "Listeners Count";
  //     case "favorite":
  //       return "Saved Favorites";
  //     case "genre":
  //       return "Music Genre";
  //   }
  // },
  // canPlay() {
  //   return this.channel.id && !this.loading ? true : false;
  // },
  // hasChannel() {
  //   return this.channel.id ? true : false;
  // },
  // hasSongs() {
  //   return this.songs.length ? true : false;
  // },
  // hasErrors() {
  //   if (this.errors.support || this.errors.stream) return true;
  //   if (this.errors.channels && !this.channels.length) return true;
  //   return false;
  // },
  toggleSidebar(toggle) {
    const state = typeof toggle === "boolean" ? toggle : false;
    if (state) {
      set({ sbActive: true, sbVisible: true });
    } else {
      set({ sbVisible: false });
      setTimeout(() => {
        set({ sbActive: false });
      }, 500);
    }
  },
  toggleFavorite(id, toggle) {},
  getChannels(sidebar) {
    soma.getChannels((_err, _channels) => {
      // if (err) return
    });
  },
  setupMaintenance() {},
  setError(key, err) {
    let errors = get().errors;
    // let errors = Object.assign({}, get().errors);
    errors[key] = String(err || "").trim();
    if (err) console.warn(`ERROR(${key}):`, err);
    set({ errors: errors });
  },
  clearError(key) {
    let errors = get().errors;
    delete errors[key];
    set({ errors: errors });
  },
  hasError(key) {
    return key && get().errors.hasOwnProperty(key);
  },
  flushErrors() {
    let errors = get().errors;
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        delete errors[key];
      }
    }
    set({ errors: errors });
  },
}));

if (process.env.NODE_ENV === "development") mountStoreDevtool("PlayerStore", useStore);

export default useStore;
