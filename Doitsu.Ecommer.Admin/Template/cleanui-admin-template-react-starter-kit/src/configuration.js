const isProduction = process.env.NODE_ENV === 'production';

const config = {
    "baseAPIUrl": isProduction ? "http://localhost:9999/api/" : "http://localhost:9999/api/"
};

export default config