export default class Configuration {
  static IS_PRODUCTION = process.env.NODE_ENV === 'production'

  static URL = {
    BASE:
      process.env.NODE_ENV === 'production'
        ? 'http://api.ygfl.vn/api'
        : 'http://localhost:9092/api',
    AUTHORIZE: 'authorize',
    ARTIST: 'artist',
    BLOG: 'blog',
    PRODUCT: 'product',
    PRODUCT_COLLECTION: 'product-collection',
    SETTINGS: 'settings',
    IMAGE: 'image',
  }
}
