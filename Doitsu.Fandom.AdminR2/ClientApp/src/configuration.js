const isProduction = process.env.NODE_ENV === 'production';
console.log("NODE_ENV: ", process.env.NODE_ENV);

const config = {
    "baseAPIUrl": isProduction ? "http://ygfl.api.doitsu.tech/api/" :  "https://localhost:54389/api/"
};

export default config