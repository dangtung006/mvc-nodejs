const allowAssets     = global.config.allowAssets;
const  Employees      = function(service){
    return {

        getList : async function(req, res){
            let page , limit;
            let employees = await service.getList();
            return res.send({
                code : "success",
                data : employees
            });
        },

        getDetail : async function(req, res){
            let { id } = req.query;
            let employee = await service.getById(id);
            return res.send({ code : "success" , data : employee});
        },

        create : async function(req, res){
            let { name , age, address, password, email, skills } = req.body;

            let employee = await service.create({
                name , age, address, password, email, skills
            });

            console.log("employee : " , employee);

            return res.send({ code : "success" , data : employee});
        },
        
        save : async function(req, res){
            
        },

        getBalanceList : async function(req, res){
            let { id }        = req.query;
            let employee      = await service.getById(id);
            let { balances }  = employee;
            return res.send({ code : "success", data : balances});
        },

        depositAsset : async function(req, res){
            let { userId, name, amount, assetId } = req.body;

            if(allowAssets.indexOf(name) < 0) {
                throw new Error("Invalid Asset");
            }

            let employee      = await service.getById(userId);

            if(employee.balances.length == 0 ) {
                if(assetId) throw new Error("Bad Request");
                employee.balances.push({ name , amount });
                employee.markModified('balances'); 
                return await employee.save();
            }

            if(!employee.balances.id(assetId)) throw new Error("Invalid asset");

            employee.balances.id(assetId).amount += parseFloat(amount);
            employee.markModified('balances'); 
            let result = await employee.save();
        },

        withdrawAsset : async function(req, res){
            let { userId, name, amount, assetId } = req.body;

            if(allowAssets.indexOf(name) < 0) {
                throw new Error("Invalid Asset");
            }

            let employee      = await service.getById(userId);

            if(employee.balances.length <= 0 || !assetId) {
                throw new Error("Bad request");
            }

            let assetBalace = employee.balances.id(assetId);
            if(!assetBalace)  throw new Error("Invalid Balance");

            if(amount > assetBalace.amount)  throw new Error("Invalid Amount");

            //update sub document;
            employee.balances.id(assetId).amount -= parseFloat(amount);
            employee.markModified('balances'); 
            await employee.save();
            return res.send("ok")

            //remove sub document;
                // await employee.balances.id(assetId).remove();
                // employee.markModified('balances');
                // let r = await employee.save();
        },

        updateSchedule : async function(req, res){
            //arrays of subdocuments and single nested subdocuments.

            //Note that populated documents are not subdocuments in Mongoose. Subdocument data is embedded in the top-level document. Referenced documents are separate top-level documents.

            let { userId, day , schedules } = req.body;
            let employee       = await service.getById(userId);

            //update nested obj
                //employee.schedules[day] = schedules;
            
            // remove field in nested obj;
                //employee.schedules[day].remove();
                
            r = await employee.save();
            console.log("r ", r);
        }
    }
}

module.exports = Employees;