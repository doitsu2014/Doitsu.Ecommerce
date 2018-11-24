const isProduction = process.env.NODE_ENV === 'production';

const config = {
    "baseAPIUrl": "http://localhost:54389"
    // "baseAPIUrl": isProduction ? "http://localhost:9999/api/" : "http://localhost:9999/api/"
};

export default config