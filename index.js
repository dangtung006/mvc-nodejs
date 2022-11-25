const config             = require("./config");
global.config            = config;
const DB                 = require("./helper/db");

async function main(){
    //init DB
    let db = new DB({ url : global.config.mongoConnectionString, optConnect : global.config.dbConnectOpt });
    await db.load();
    //init redis
    // init app
    require("./app");
}   

main();