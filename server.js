var express = require('express');
// TODO include server specific config here


var api = express();

require("./routes/api")(api);
var port = (process.env.PORT || 5000)
api.listen(port, function () {
    //console.log("started on 8080");

});