var express = require('express');
// TODO include server specific config here
var api = express();

var port = (process.env.PORT || 8080);

var mongUtil = require("./model/people");
mongUtil.connectToServer(function () {
    require("./routes/api")(api, new mongUtil.croud());
    api.listen(port, function () {
        console.log("started on " + port);

    });
});