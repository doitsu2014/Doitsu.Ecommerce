import Utils from "../utils";
import fetch from "isomorphic-unfetch";

const endpoint = `${Utils.URL.BASE}/${Utils.URL.TAG}`;

export default class TagService {
  static async getPopular() {
    try {
      const url = new URL(`${endpoint}/read-popular`);

      const res = await fetch(url.href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const baseData = await res.json();
      return baseData;
    } catch (ex) {
      console.error(ex);
      return [];
    }
  }

  static async get(blogId = null) {
    try {
      const url = new URL(`${endpoint}/read`);

      const params = Utils.buildSearchParams({
        blogId
      })
      url.search = params;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const baseData = await res.json();
      return baseData;
    } catch (ex) {
      console.error(ex);
      return [];
    }
  }
}
