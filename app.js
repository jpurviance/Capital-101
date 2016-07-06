var express = require('express');
// TODO include server specific config here


var api = express();

require("./routes/api")(api);

api.listen(3000, function () {
    console.log("started on 8080");

});