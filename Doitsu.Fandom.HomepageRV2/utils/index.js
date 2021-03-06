const isProd = process.env.NODE_ENV === "production";
export default class Utils {
  static URL = {
    BASE: isProd ? "http://api.ygfl.vn" : "http://localhost:9092",
    SETTINGS: "api/settings",
    ARTIST: "api/artist",
    BLOG: "api/blog",
    PRODUCT: "api/product",
    PRODUCT_COLLECTION: "api/product-collection",
    TAG: "api/tag",
    BLOG_CATEGORY: "api/blog-category"
  };

  static BLOG_CATEGORY_CONSTS = {
    NOTICE: 1,
    NEWS: 2
  };

  static SLIDER_TYPE_ENUM = {
    BLOG: 1,
    PRODUCT_COLLECTION: 2
  };

  /**
   * This function to have user build a URLSearchParams from their obj
   * and it can handle some case like a property is undefined and a property is null,...
   *
   * They have to pass a object
   */
  static buildSearchParams = function(obj = undefined) {
    const params = new URLSearchParams();
    if (!obj) return params;

    Object.keys(obj).forEach((val, i) => {
      if (obj[val] != null && obj[val] != undefined) params.set(val, obj[val]);
    });

    return params;
  };
  
  /** 
   * A utils function to help dev build a short content from a long content
   * 
   * content {string}: default is empty string
   * lenght {int}: default is 25
  */
  static buildShortContent(content = "", length = 24) {
    try {
      if ((typeof content !== "string")) {
        return "";
      }
      content = content.replace(/<[^>]*>/g, "");
      if(content.length > length) content = content.substr(0, length).concat(" ...");
      return content;
    } catch (e) {
      console.error(e);
      return content;
    }
  }
}
