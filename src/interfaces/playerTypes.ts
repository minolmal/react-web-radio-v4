import { Channel, IErrors, IFavoritesArray, tSongs, tSortOrder, tSortParams } from "./channelTypes";
import React from "react";

export interface PlayerState {
  // toggles
  init: boolean;
  visible: boolean;
  playing: boolean;
  loading: boolean;
  sidebar: boolean;
  volume: number;

  // sidebar toggles
  sbActive: boolean;
  sbVisible: boolean;
  // channels stuff
  route: string;
  channels: Array<Channel>;
  // | Record<string, never>
  channel: Channel;
  songs: Array<tSongs>;
  track: {};
  favorites: Array<IFavoritesArray>;
  errors: IErrors;

  // timer stuff
  timeStart: number;
  timeDisplay: string;
  timeItv: any;

  // sorting stuff
  searchText: string;
  /**
   *@param title: string,
   *@param listeners: number,
   *@param favorite: boolean,
   *@param genre: string*/
  sortParam: tSortParams;
  sortOrder: tSortOrder;

  // timer stuff
  anf: any;
  sto: any;
  itv: any;
}

export const initialState: PlayerState = {
  // toggles
  init: false,
  visible: true,
  playing: false,
  loading: false,
  sidebar: false,
  volume: 100,
  // sidebar toggles
  sbActive: false,
  sbVisible: false,
  // channels stuff
  route: "/",
  channels: [],
  channel: {} as Channel,
  songs: [],
  track: {},
  favorites: [],
  errors: {} as IErrors,
  // timer stuff
  timeStart: 0,
  timeDisplay: "00:00:00",
  timeItv: null,
  // sorting stuff
  searchText: "",
  sortParam: "listeners",
  sortOrder: "desc",
  // timer stuff
  anf: null,
  sto: null,
  itv: null,
};

export type tSortLabel = "Station Name" | "Listeners Count" | "Saved Favorites" | "Music Genre";
export interface PlayerActions {
  channelsList: () => Channel[];
  songsList: () => tSongs[];
  sortLabel: () => tSortLabel;
  canPlay: () => boolean;
  hasChannel: () => boolean;
  hasSongs: () => boolean;
  hasErrors: () => boolean;

  // api
  setupMaintenance: () => void;
  setError: (key: string, err: string) => void;
  clearError: (key: string) => void;
  hasError: (key?: string) => any;
  flushErrors: () => void;
  setupEvents: () => void;
  initPlayer: () => void;
  resetPlayer: () => void;
  tryAgain: () => void;
  toggleSidebar: (toggle: boolean) => void;
  togglePlay: (e: any) => void;
  saveVolume: () => void;
  loadVolume: () => void;
  loadSortOptions: () => void;
  toggleSortOrder: () => void;
  sortBy: (param: tSortParams, order: tSortOrder) => void;
  loadFavorites: () => void;
  saveFavorites: () => void;
  toggleFavorite: (id: string, toggle: boolean) => void;
  // setupAudio: () => void;
  closeAudio: () => void;
  // setupCanvas
  // updateCanvas
  getChannels: (sidebar?: boolean) => void;
  getSongs: (channel: Channel, callback?: any) => void;
  isCurrentChannel: (channel: Channel) => boolean;
  updateCurrentChannel: () => void;
  // playAudioStream: (_stream: any) => void;
  playChannel: (channel: Channel) => void;
  selectChannel: (channel: Channel, play?: boolean) => void;
  setRoute: (route: string) => void;
  applyRoute: (route: string, sidebar?: boolean) => void;
  onKeyboard: (e: any) => void;
  onWaiting: (e: any) => void;
  onPlaying: (e: any) => void;
  onEnded: (e: any) => void;
  onError: (e: any) => void;
  startClock: () => void;
  updatedClock: () => void;
  stopClock: () => void;
  clearTimers: () => void;
}
