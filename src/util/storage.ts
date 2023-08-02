import { tSortOrder, tSortParams } from "@/interfaces/channelTypes";

/**
 * Basic localStorage wrapper
 */
type tStorage = {
  [key: string]: any;
  time: number;
  expire: number;
  data: tSort;
};

type tSort = {
  // [key: string]: any;
  param?: tSortParams;
  order?: tSortOrder;
  favs?: object;
};

const storage = {
  /** save data */
  setData(key: string, data: any, ttl?: any) {
    if (!this._isStr(key)) return;
    const time = Date.now();
    const expire = Number(ttl) || 0;
    const json = JSON.stringify({ time, expire, data });
    window.localStorage.setItem(key, json);
  },
  /** get saved data */
  getData(key: string) {
    if (!this._isStr(key)) return;
    const json = window.localStorage.getItem(key) || "{}";
    const parsed: tStorage = JSON.parse(json) || {};
    const { time, data, expire } = parsed;
    if (this._isExpired(time, expire)) this.deleteData(key);
    return data;
  },
  /** remove saved data */
  deleteData(key: string) {
    if (!this._isStr(key)) return;
    window.localStorage.removeItem(key);
  },
  /** check valid string */
  _isStr(str: any) {
    return str && typeof str === "string";
  },
  /** check if data saved has expired */
  _isExpired(time: number, expire: number) {
    if (!time || !expire) return false;
    const now = Date.now();
    const secs = (now - time) / 1000;
    return secs >= expire ? true : false;
  },
};

export default storage;
