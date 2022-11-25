
const serviceFactory  = require("../services/index");

module.exports = {
    controllers : {
        employees : null
    },

    getController(controller){
        switch(controller) {

            case "employees": {
                if(!this.controllers['employees']){
                    this.controllers['employees'] = require("./employees")(serviceFactory.getService("employees"));
                } 
                return this.controllers[controller];
            }

            default:
                return null;
        }
    }
}