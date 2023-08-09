import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PlayerActions, PlayerState, initialState } from "@/interfaces/playerTypes";
import soma from "@/util/soma";
import storage from "@/util/storage";
import utils from "@/util/utils";
import audio from "@/util/audio";

let enableDevTools = process.env.NODE_ENV === "production" ? false : true;

interface IStore extends PlayerState, PlayerActions {}
const usePlayerStore = create<IStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      // computed methods
      channelsList: () => {
        let { channels, channel, sortOrder, sortParam, searchText } = get();
        let list = channels.slice();
        let id = channel.id;

        let search = searchText
          .replace(/[^\w\s\-]+/g, "")
          .replace(/[\r\s\t\n]+/g, " ")
          .trim();

        if (search && search.length > 1) {
          list = utils.search(list, "title", search);
        }
        if (sortParam) {
          list = utils.sort(list, sortParam, sortOrder, false);
        }
        if (id) {
          list = list.map((item) => {
            item.active = id === item.id ? true : false;
            return item;
          });
        }
        return list;
      },
      songsList: () => {
        let list = get().songs.slice();
        return list;
      },
      sortLabel: () => {
        switch (get().sortParam) {
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
      canPlay: () => {
        return get().channel.id && !get().loading ? true : false;
      },
      hasChannel: () => {
        return get().channel.id ? true : false;
      },
      hasSongs: () => {
        return get().songs.length ? true : false;
      },
      hasErrors: () => {
        const { errors, channels } = get();
        if (errors.support || errors.stream) return true;
        if (errors.channels && !channels.length) return true;
        return false;
      },

      // custom methods
      setupMaintenance: () => {
        const { sidebar, channel, getChannels, getSongs } = get();
        set(
          {
            itv: setInterval(() => {
              getChannels(sidebar);
              getSongs(channel);
            }, 1000 * 30),
          },
          false,
          "Maintenance Trigger"
        );
      },
      setError: (key, err) => {
        let errors = get().errors;
        // let errors = Object.assign({}, get().errors);
        errors[key] = String(err || "").trim();
        if (err) console.warn(`ERROR(${key}):`, err);
        set({ errors: errors }, false, "Set Error");
      },
      clearError: (key) => {
        let errors = get().errors;
        delete errors[key];
        set({ errors: errors }, false, "Clear Error");
      },
      hasError: (key) => {
        return key && get().errors.hasOwnProperty(key);
      },
      flushErrors: () => {
        let errors = get().errors;
        for (const key in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, key)) {
            delete errors[key];
          }
        }
        set({ errors: errors }, false, "Flush Errors");
      },
      resetPlayer: () => {
        get().closeAudio();
        get().flushErrors();

        let _channel = get().channel;
        for (const key in _channel) {
          if (Object.prototype.hasOwnProperty.call(_channel, key)) {
            delete _channel[key];
          }
        }
        set({ channel: _channel, songs: [] }, false, "Reset Player");
      },
      toggleSidebar: (toggle) => {
        const state = typeof toggle === "boolean" ? toggle : false;
        if (state) {
          set(
            {
              sbActive: true, // bring to front
              sbVisible: true, // show drawer
            },
            false,
            "Show Sidebar"
          );
        } else {
          set({ sbVisible: false }, false, "Hide Sidebar");
          setTimeout(() => {
            set({ sbActive: false }, false, "Send Sidebar to back");
          }, 500);
        }
      },
      loadFavorites: () => {
        const favs = storage.getData("favorites_data");
        if (!Array.isArray(favs)) return; //TODO: return error "storage corrupted"
        set({ favorites: favs }, false, "Load Favorites from Local Storage");
      },
      saveFavorites: () => {
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
        element.setAttribute(
          "href",
          "data:audio/mpegurl;charset=utf-8," + encodeURIComponent(data)
        );
        element.setAttribute("download", "somafm_favorites.m3u");
        element.setAttribute("target", "_blank");
        document.body.appendChild(element);
        setTimeout(() => element.click(), 100);
        setTimeout(() => element.remove(), 1000);
      },
      toggleFavorite: (id, toggle) => {
        let favs = get().favorites.slice();
        favs = favs.filter((fid) => fid !== id);
        if (toggle) favs.push(id);
        set({ favorites: favs }, false, "Set Favorites");
        get().updateCurrentChannel();
        storage.setData("favorites_data", favs);
      },
      closeAudio: () => {
        audio.stopAudio();
        set({ playing: false }, false, "Close Audio");
      },
      getChannels: (sidebar) => {
        soma.getChannels((_err, _channels) => {
          if (_err) return get().setError("channels", _err);
          set({ channels: _channels }, false, "Set Fetched Channels");
          get().clearError("channels");
          get().updateCurrentChannel();
          get().applyRoute(window.location.hash, sidebar);
        });
      },
      getSongs: (channel, callback) => {
        if (!channel || !channel.id || !channel.songsurl) return;
        if (!get().isCurrentChannel(channel))
          set({ songs: [], track: {} }, false, "Get Songs - Clear Songs and Track");

        soma.getSongs(channel, (err, songs) => {
          if (err) return get().setError("songs", err);
          if (typeof callback === "function") callback(songs);
          set(
            { track: songs.shift(), songs: songs.slice(0, 3) },
            false,
            "Get Songs - Set Fetched Songs"
          );
          get().clearError("songs");
        });
      },
      isCurrentChannel: (channel) => {
        let id = get().channel.id;

        if (!channel || !channel.id || !id) return false;
        if (id !== channel.id) return false;
        return true;
      },
      updateCurrentChannel: () => {
        let array = get().channels;
        for (let c of array) {
          // see if channel has been saved as a favorite
          c.favorite = get().favorites.indexOf(c.id) >= 0;
          // see if channel is currently selected
          if (get().isCurrentChannel(c)) {
            // set({ channel: Object.assign(this.channel, c) });
            set({ channel: c }, false, "Set Current Channel");
            c.active = true;
          }
        }
      },
      playChannel: (channel) => {
        const { playing, volume } = get();
        if (playing || !channel || !channel.mp3file) return;
        set({ loading: true }, false, "Play Channel");
        audio.playSource(channel.mp3file);
        audio.setVolume(volume);
      },
      selectChannel: (channel, play = false) => {
        const { isCurrentChannel, closeAudio, toggleSidebar, setRoute, getSongs, playChannel } =
          get();
        if (!channel || !channel.id) return;
        if (isCurrentChannel(channel)) return;
        closeAudio();
        toggleSidebar(false);
        setRoute(channel.route);
        getSongs(channel);
        set({ channel: channel }, false, "Select Channel");
        if (play) {
          playChannel(channel);
        }
      },
      setRoute: (route) => {
        route =
          "/" +
          String(route || "")
            .replace(/^[\#\/]+|[\/]+$/g, "")
            .trim();
        window.location.hash = route;
        set({ route: route }, false, "Set Route");
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
    }),
    { name: "PlayerStore", enabled: enableDevTools }
  )
);

export default usePlayerStore;
