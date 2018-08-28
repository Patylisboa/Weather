var appRoot = require('app-root-path'),
 app = require(appRoot + '/app/config/express')(),
 port = process.env.PORT || 3000, routes = require(appRoot + '/app/routes/routes'); //importing route

 routes(app); //register the route

app.listen(port,function(){
    console.log("servidor rodando");
});

