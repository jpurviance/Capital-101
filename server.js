var express = require('express');
var routes = require('./routes');
// TODO include server specific config here


var app = express();
//initializes routing for angular application
require('./routes/index')(app);

var port = (process.env.PORT || 8080);
app.listen(port, function () {
    console.log("started on " + port);

});