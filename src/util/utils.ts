/**
 * Common utils
 */

import { Channel } from "@/interfaces/channelTypes";

// type tList = { [key: string]: string | number | boolean } | Object;

const utils = {
  /**  get search results off a list for an object key*/
  search(list: Array<Channel>, key: string, search: string) {
    const regexp = new RegExp(`^(${search})`, "i");
    return list.filter((item) => regexp.test(item[key]));
  },
  /**  sort objects in an array by a key*/
  sort(list: Array<Channel>, key: string, order: string, ignore: boolean) {
    // TODO: test this method
    return list.sort((a, b) => {
      if (a.hasOwnProperty(key)) {
        let _a = a[key];
        let _b = b[key];

        if (ignore) {
          // sort strings using same case
          _a = typeof _a === "string" ? _a.toUpperCase() : _a;
          _b = typeof _b === "string" ? _b.toUpperCase() : _b;
        }
        if (order === "asc") {
          if (_a < _b) return -1;
          if (_a > _b) return 1;
        }
        if (order === "desc") {
          if (_a > _b) return -1;
          if (_a < _b) return 1;
        }
      }
      return 0;
    });
  },
};

export default utils;
