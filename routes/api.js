

function Route(warehouse) {
    var costco = warehouse;

    this.hello_world = function (req, res) {
        costco.new_person({
            name: "foo",
            email: "foo",
            password: "foo",
            profilePicture: "foo",
            type: "foo",
            id: "foo",
            fb_token: "foo"
        }, function (err, record) {
            if (err){
                console.log(err);
            }
            res.json(record);
        });

    }
}


module.exports = function(app, Warehouse){


    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    var route = new Route(Warehouse);

    app.get('/api/',  route.hello_world);
}