// type
export interface Channel extends Object {
  [key: string]: any;
  id: string;
  playlists: Playlist[];
  listeners: number;
  updated: number;
  twitter: string;

  plsfile: string;
  mp3file: string;
  songsurl: string;
  infourl: string;
  route: string;
  favorite: boolean;
  active: boolean;

  title: string;
  description: string;
  dj: string;
  djmail: string;
  genre: string;
  image: string;
  largeimage: string;
  xlimage: string;
  // preroll: any[];
  lastPlaying: string;
}

type Playlist = {
  [index: string]: string;
  url: string;
  format: string;
  quality: string;
};

export type tSongs = {
  [index: number]: string;
  title: string;
  artist: string;
  album: string;
  albumart: string;
  date: string;
};

export interface IErrors extends Object {
  [index: string]: any;
  key: string;
  err: any;
  support?: string;
  stream?: string;
  channels?: string;
}

// export type tErrors = {
//   [index: number]: any;
//   key: string;
//   err: unknown;
//   support?: string;
//   stream?: string;
//   channels?: string;
// } & Object;

type tFavorites = {
  [key: string]: any;
  time: number;
  expire: number;
  data: any;
};

export type tSortParams = "title" | "listeners" | "favorite" | "genre";
export type tSortOrder = "desc" | "asc";

export interface IFavoritesArray {
  [index: number]: string;
}
