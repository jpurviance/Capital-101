

function Route(/* pass warehouse*/) {
    this.hello_world = function (req, res) {
        res.json({
            Status: process.env.MONGODB_URI
        });

    }
}


module.exports = function(app /*  Warehouse*/){


    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    var route = new Route();

    app.get('/api/',  route.hello_world);
}