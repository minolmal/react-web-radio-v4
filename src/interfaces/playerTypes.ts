import { MutableRefObject, Ref } from "react";
import { Channel, tErrors, tSongs, tSortOrder, tSortParams } from "./channelTypes";

export interface PlayerState {
  // toggles
  init: boolean;
  visible: boolean;
  playing: boolean;
  loading: boolean;
  sidebar: boolean;
  volume: number;
  sidebarDrawerRef: Ref<HTMLElement>;

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
  favorites: Array<Channel>;
  errors: tErrors;

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
  sidebarDrawerRef: null,
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
  errors: {} as tErrors,
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

export interface PlayerActions {
  // channelsList: () => Channel[];
  // songsList: () => tSongs[];
  // sortLabel: () => string;
  // canPlay: () => boolean;
  // hasChannel: () => boolean;
  // hasSongs: () => boolean;
  // hasErrors: () => boolean;

  // api
  // setupMaintenance: () => void;
  // setError: (_key: string, _err: string) => void;
  // clearError: (_key: string) => void;
  // hasError: (_key?: string) => any;
  // flushErrors: () => void;
  // setupEvents: () => void;
  // resetPlayer: () => void;
  // tryAgain: () => void;
  toggleSidebar: (toggle: boolean) => void;
  // initSidebar: () => void;
  // togglePlay: () => void;
  // loadSortOptions: () => void;
  // toggleSortOrder: () => void;
  // sortBy: (_param: tSortParams, _order: tSortOrder) => void;
  // loadFavorites: () => void;
  // saveFavorites: () => void;
  toggleFavorite: (_id: string, _toggle: boolean) => void;
  // setupAudio: () => void;
  // closeAudio: () => void;
  // setupCanvas
  // updateCanvas
  // getChannels: (_sidebar?: boolean) => void;
  // getSongs: (_channel: Channel, _callback?: any) => void;
  // isCurrentChannel: (_channel: Channel) => boolean;
  // updateCurrentChannel: () => void;
  // playAudioStream: (_stream: any) => void;
  // playChannel: (_channel: any) => void;
  // selectChannel: (_channel: any) => void;
  // setRoute: (_route: string) => void;
  // applyRoute: (_route: string) => void;
  // onKeyboard: (_e: KeyboardEvent) => void;
  // startClock: () => void;
  // updatedClock: () => void;
  // stopClock: () => void;
  // clearTimers: () => void;
}
