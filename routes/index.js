const App                   = require("express");
const Router                = App.Router();
const controllerFactory     = require("../controllers/index");
const employeesController   = controllerFactory.getController("employees");

Router.post("/employees/create", employeesController.create);
Router.post("/employees/save", employeesController.save);
Router.get("/employees/list", employeesController.getList);
Router.get("/employees/detail", employeesController.getDetail);

Router.get("/employees/balances", employeesController.getBalanceList);
Router.post("/employees/deposit", employeesController.depositAsset);
Router.put("/employees/withdraw", employeesController.withdrawAsset);

Router.put("/employees/schedules/update", employeesController.updateSchedule);

module.exports = Router;
