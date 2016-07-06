var express = require('express');
var routes = require('./routes');
// TODO include server specific config here
var app = express();

var port = (process.env.PORT || 8080);

var mongUtil = require("./model/people");
mongUtil.connectToServer(function () {
    require("./routes/api")(app, new mongUtil.croud());
    require('./routes/index')(app)
    app.listen(port, function () {
        console.log("started on " + port);

    });
});