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
  // [key: string]: string;
  url: string;
  format: string;
  quality: string;
};

export type tSongs = {
  [key: string]: string;
  title: string;
  artist: string;
  album: string;
  albumart: string;
  date: string;
};

export type tErrors = {
  [key: string]: any;
  key: string;
  err: any;
  support?: string;
  stream?: string;
  channels?: string;
};

type tFavorites = {
  [key: string]: any;
  time: number;
  expire: number;
  data: any;
};

export type tSortParams = "title" | "listeners" | "favorite" | "genre";
export type tSortOrder = "desc" | "asc";
