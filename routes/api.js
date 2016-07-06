

function Route(warehouse) {
    var costco = warehouse;

    var new_user = ["name", "email", "password", "profilePicture", "type", "fb_token"];
    var get_user = ["id"]
    
    function valid_add_user(jsn) {
        for (var i = 0; i < new_user.length; i++){
            if (!new_user[i] in jsn){
                return false;
            }
        }
        return true;
        
    }

    function valid_get_user(jsn) {
        for (var i = 0; i < get_user.length; i++){
            if (! get_user[i] in jsn){
                return false;
            }

        }
        return true;
    }

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




    /*
    {
        token: 42,
        user: {
            name: "my_name",
            email: "my_email@email.com",
            password: "my_secret_password",
            profilePicture: "url",
            type: "type",
            fb_token: "token"
            }
        }
    }
    * */
    this.new_user = function (req, res) {
        var body = req.body;
        if (body.token == 42){
            if (valid_add_user(body.user)) {
                costco.new_person(body.user, function (err, record) {
                    if (err){
                        console.log(err);
                        res.status(500);
                        res.json({status: err});
                    } else {
                        var ret = {
                            status: "NO_ERR",
                            user: record
                        }
                        res.json(ret);
                    }
                });
            }
        } else {
            res.json({
                status: "NO_AUTH",
            });
        }
    }



    /*
    {
     token: 42,
     user: "id"
    }

     */
    this.get_user = function (req, res) {
        var body = req.body;
        if (body.token){
            if (valid_get_user(body)){
                res.json({});
            }
        } else {
            res.json({
                status: "NO_AUTH",
            });
        }


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
    
    app.post('/api/user/create', route.new_user);
    app.get('/api/user/', route.get_user);
}
