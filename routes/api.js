

function Route(warehouse, jobs) {
    var costco = warehouse;
    var in_line = jobs;

    var new_user = ["name", "email", "password", "profilePicture", "type", "fb_token"];
    var get_user = ["token", "user"];
    var auth_user = ["email", "password", "fb_token"];
    var new_issue = ["type", "customer", "ambassador", "finished", "rating", "notes"];
    
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

    function valid_auth(jsn) {
        for (var i = 0; i < auth_user.length; i++){
            if (!auth_user[i] in jsn){
                return false;
            }
        }

        return true;
    }

    function valid_issue(jsn) {
        for (var i = 0; i < new_issue.length; i++){
            if(!new_issue[i] in jsn){
                return false
            }

        }
        return true;
    }


    /*
     {
        token: 42,
        help:{
            type: "Checking",
            info: "My Grandson says i need one a them credit cards",
            customer_id: "id",
            ambassador_id: "id",
            finished: boolean,
            rating: int,
            notes: "Needed a credit card"
        }
     }
    * */
    this.add_to_line = function (req, res) {
        var body = req.body;
        if (body.token == 42){
            if (valid_issue(body.help)){
                // TODO I do not check that the fields are set, just that they are there.
                in_line.get_in_line(body.help);
                res.json({
                    status:"NO_ERR",
                    help: body.help,
                });
            } else {
                res.status(400);
                res.json({status: "BAD_REQUEST"});
            }
        } else {
            res.json({
                status: "NO_AUTH",
            });
        }
    }


    /*
    {
        token: 42
    }
    * */
    this.who_is_next = function (req, res) {
        var body = req.body;
        if (body.token == 42){
            res.json({
                status: "NO_ERR",
                line: in_line.get_all()
            });
        } else {
            res.json({
                status: "NO_AUTH",
            });
        }
    }


    /* TODO does not support facebook
    {
        user: "username",
        token: 42,
        password: "password",
    }
    * */
    this.auth = function (req, res) {
        var body = req.body;
        if (body.token == 42){
            if (valid_auth(body)){
                costco.find_by_username(body.user, function (err, doc) {
                    if (err){
                        console.log(err);
                        res.status(500);
                        res.json({status: "BAD_AUTH"});
                    } else {
                        if (doc.password == body.password){
                            ret = {
                                status: "NO_ERR",
                                user: doc,
                            }
                            res.json(ret);
                        } else {
                            res.json({status: "BAD_AUTH"});
                        }
                    }
                });
            } else {
                res.status(400);
                res.json({status: "BAD_REQUEST"});
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
            } else {
                res.status(400);
                res.json({status: "BAD_REQUEST"});
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
        console.log(body);
        if (body.token == 42){
            if (valid_get_user(body)){
                costco.find_by_id(body.user, function (err, doc) {
                    if (err){
                        console.log(err);
                        res.status(500);
                        res.json({status: "INTERNAL_ERR",
                        error: err});
                    } else {
                        var ret = {
                            status: "NO_ERR",
                            user: doc
                        }
                        res.json(ret);
                    }
                });
            } else {
                res.status(400);
                res.json({status: "BAD_REQUEST"});
            }
        } else {
            res.json({
                status: "NO_AUTH",
            });
        }


    }
}


module.exports = function(app, Warehouse){


    var line =  require("../util/help");

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    var route = new Route(Warehouse, new line());

    
    app.post('/api/user/create', route.new_user);
    app.post('/api/user', route.get_user);
    app.post('/api/user/auth', route.auth);
    app.post('/api/line', route.who_is_next);
    app.post("/api/add_issue", route.add_to_line);
}
