import Utils from "../utils";
import fetch from "isomorphic-unfetch";

const endpoint = `${Utils.URL.BASE}/${Utils.URL.BLOG}`;

export default class BlogService {
  static async get(
    blogCategoryId = undefined,
    limit = 100,
    currentPage = 0
  ) {
    try {
      const url = new URL(`${endpoint}/read`);
      const params = Utils.buildSearchParams({
        blogCategoryId,
        limit,
        currentPage
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

  static async getBySlug(slug) {
    try {
      const res = await fetch(`${endpoint}/read-by-slug?slug=${slug}`, {
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
