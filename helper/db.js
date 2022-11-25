const { delay } = require("../util/time");

const MongooseModule = require('mongoose');

const DB_HELPER = function (opt){
    var url = opt && opt.url ? opt.url : null
    var optConnect =  opt && opt.optConnect ? opt.optConnect : null;

    const db  = MongooseModule.connection;

    db.once('open', () => {
        console.log('Connected to database');
    });

    const _load =  async function(count = 0){
        if(!url || !optConnect)  return console.log("In valid connect");

        try{
            return await MongooseModule.connect(url, optConnect);
        }catch(e){
            if(count <= 10) {
                await delay(1500);
                return _load(count);
            }
            return new Error("Fail to connect DB")
        }
    };

    return {
        load : _load
    }
}

module.exports = DB_HELPER;