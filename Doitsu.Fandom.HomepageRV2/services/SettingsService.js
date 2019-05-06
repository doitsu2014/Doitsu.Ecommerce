import Utils from "../utils";
import fetch from "isomorphic-unfetch";

const endpoint = `${Utils.URL.BASE}/${Utils.URL.SETTINGS}`;

export default class SettingsService {
  static async get() {
    try {
      const url = new URL(`${endpoint}/read-list-slider`);
      const params = Utils.buildSearchParams({
        isSlider: true
      })
      url.search = params;

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

}
