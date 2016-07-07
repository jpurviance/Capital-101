var mongoose = require('../node_modules/mongoose');


function connectToServer(callback){
    var db_uri = process.env.MONGODB_URI;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!");
    });
    mongoose.connect(db_uri);
    return callback();
}


var Warehouse = function(){
    // var storage = db;

    var UserSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        profilePicture: String,
        type: String,
        fb_token: String
    }, { collection: 'people' });

    var person = mongoose.model('person', UserSchema);


    // This assumes that the user exists. 
    this.find_by_email = function (eml, callback) {
        person.findOne({email: eml}, function (err, docs) {
            return callback(err, docs);
        });
    };

    this.find_by_id = function (user, callback) {
        person.findById(user._id, function (err, docs) {
            return callback(err, docs);
        });
    };

    this.find_by_username = function (username, callback) {
        person.find({name: usernmae}, callback(err, docs));
    };

    this.new_person = function (doc, callback) {
        var p = new person(doc);
        p.save(callback);
    }
};

module.exports.connectToServer = connectToServer;

module.exports.croud = Warehouse;