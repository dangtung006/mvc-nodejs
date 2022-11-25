const Express            = require("express")
const App                = Express();
const Router             = require('./routes/index');


App.use(Express.json());
App.use(Express.urlencoded({ extended : true }));

App.use('/', Router);
App.listen(3000, function() {
    console.log("app is lisening on port : " , 3000);
});