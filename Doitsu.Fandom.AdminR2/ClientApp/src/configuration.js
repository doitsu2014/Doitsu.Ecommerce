const isProduction = process.env.NODE_ENV === 'production';
console.log("NODE_ENV: ", process.env.NODE_ENV);

const config = {
    //"baseAPIUrl": isProduction ? "http://fandom.api.doitsu.tech/api/" :  "http://localhost:9092/api/"
    "baseAPIUrl": isProduction ? "http://api.ygfl.vn/api/" :  "http://localhost:9092/api/"
};

export default config