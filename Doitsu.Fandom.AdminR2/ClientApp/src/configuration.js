const isProduction = process.env.NODE_ENV === 'production';
console.log("NODE_ENV: ", process.env.NODE_ENV);

const config = {
    // "baseAPIUrl": "http://localhost:54389/api/"
    "baseAPIUrl": isProduction ? "http://ygfl.api.doitsu.tech/api/" :  "http://localhost:54389/api/"
};

export default config