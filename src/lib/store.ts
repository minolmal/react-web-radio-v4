import { PlayerActions, PlayerState, initialState } from "@/interfaces/playerTypes";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import soma from "@/util/soma";
import storage from "@/util/storage";
import utils from "@/util/utils";
import audio from "@/util/audio";

interface IStore extends PlayerState, PlayerActions {}
const useStore = create<IStore>()((set, get) => ({
  ...initialState,
  channelsList() {
    let list = get().channels.slice();
    let sortParam = get().sortParam;
    let id = get().channel.id;
    let search = get()
      .searchText.replace(/[^\w\s\-]+/g, "")
      .replace(/[\r\s\t\n]+/g, " ")
      .trim();

    if (search && search.length > 1) {
      list = utils.search(list, "title", search);
    }
    if (sortParam) {
      list = utils.sort(list, sortParam, get().sortOrder, false);
    }
    if (id) {
      list = list.map((item) => {
        item.active = id === item.id ? true : false;
        return item;
      });
    }
    return list;
  },
  songsList() {
    let list = get().songs.slice();
    return list;
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
  resetPlayer() {
    get().closeAudio();
    get().flushErrors();

    let _channel = get().channel;
    for (const key in _channel) {
      if (Object.prototype.hasOwnProperty.call(_channel, key)) {
        delete _channel[key];
      }
    }
    set({ channel: _channel, songs: [] });
  },
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
  loadFavorites() {
    const favs = storage.getData("favorites_data");
    if (!Array.isArray(favs)) return; //TODO: return error "storage corrupted"
    set({ favorites: favs });
  },
  saveFavorites() {
    let data = "#EXTM3U";
    for (const id of get().favorites) {
      const channel = get()
        .channels.filter((ch) => ch.id === id)
        .shift();
      if (!channel) continue;
      data += "\n\n";
      data += `#EXTINF:0,${channel.title} [SomaFM]\n`;
      data += `${channel.mp3file}`;
    }
    const element = document.createElement("a");
    element.setAttribute("href", "data:audio/mpegurl;charset=utf-8," + encodeURIComponent(data));
    element.setAttribute("download", "somafm_favorites.m3u");
    element.setAttribute("target", "_blank");
    document.body.appendChild(element);
    setTimeout(() => element.click(), 100);
    setTimeout(() => element.remove(), 1000);
  },
  toggleFavorite(id, toggle) {
    let favs = get().favorites.slice();
    favs = favs.filter((fid) => fid !== id);
    if (toggle) favs.push(id);
    set({ favorites: favs });
    get().updateCurrentChannel();
    storage.setData("favorites_data", favs);
  },
  closeAudio() {
    audio.stopAudio();
    set({ playing: false });
  },
  getChannels(sidebar) {
    soma.getChannels((_err, _channels) => {
      if (_err) return get().setError("channels", _err);
      set({ channels: _channels });
      get().clearError("channels");
      get().updateCurrentChannel();
      get().applyRoute(window.location.hash, sidebar);
    });
  },
  getSongs(channel, callback) {
    if (!channel || !channel.id || !channel.songsurl) return;
    if (!get().isCurrentChannel(channel)) set({ songs: [], track: {} });

    soma.getSongs(channel, (err, songs) => {
      if (err) return get().setError("songs", err);
      if (typeof callback === "function") callback(songs);
      set({ track: songs.shift(), songs: songs.slice(0, 3) });
      get().clearError("songs");
    });
  },
  isCurrentChannel(channel) {
    let id = get().channel.id;

    if (!channel || !channel.id || !id) return false;
    if (id !== channel.id) return false;
    return true;
  },
  updateCurrentChannel() {
    for (const c of get().channels) {
      c.favorite = get().favorites.indexOf(c.id) >= 0;
      if (get().isCurrentChannel(c)) {
        set({ channel: c });
        c.active = true;
      }
    }
  },
  selectChannel(channel, play = false) {
    if (!channel || !channel.id) return;
    if (get().isCurrentChannel(channel)) return;
    get().closeAudio();
    get().toggleSidebar(false);
    get().setRoute(channel.route);
    get().getSongs(channel);

    // if(play) get() //TODO:
  },
  setRoute(route) {
    route =
      "/" +
      String(route || "")
        .replace(/^[\#\/]+|[\/]+$/g, "")
        .trim();
    window.location.hash = route;
    set({ route: route });
  },
  applyRoute(route, sidebar = false) {
    const data = String(route || "")
      .replace(/^[\#\/]+|[\/]+$/g, "")
      .trim()
      .split("/");
    const action = data.length ? data.shift() : "";
    const param = data.length ? data.shift() : "";

    if (action === "channel" && param) {
      const channel = get()
        .channels.filter((c) => c.id === param)
        .shift();
      if (channel && channel.id) {
        return get().selectChannel(channel);
      }
    }
    get().closeAudio();
    get().resetPlayer();
    get().toggleSidebar(sidebar);
  },
}));

if (process.env.NODE_ENV === "development") mountStoreDevtool("PlayerStore", useStore);

export default useStore;
