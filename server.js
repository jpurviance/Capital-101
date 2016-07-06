var express = require('express');
// TODO include server specific config here


var api = express();


var mongoose = require('mongoose');

require("./routes/api")(api);
var port = (process.env.PORT || 8080);
var db_uri = process.env.MONGODB_URI;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
});



mongoose.connect(db_uri);


var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePicture: String,
    type: String,
    id: String,
    fb_token: String,
});

person = mongoose.model('person', UserSchema);

api.get('/', function (req, res) {

    var n = new person({
        name: "foo",
        email: "foo",
        password: "foo",
        profilePicture: "foo",
        type: "foo",
        id: "foo",
        fb_token: "foo",
    });
    n.save(function (err) {
        console.log(err);
        res.json(n);
    })
});
api.listen(port, function () {
    console.log("started on " + port);

});