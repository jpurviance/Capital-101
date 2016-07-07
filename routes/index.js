'use strict';
var express = require('express');
var path = require('path');

exports.index = function(req, res){
    res.render('index');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

module.exports = function(app) {
    app.set('views', __dirname + '/../view');
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../bower_components')));
    app.use('/static', express.static('bower_components'));
    app.get('/', exports.index);
    app.get('/partials/:name', exports.partials);
    app.get('*', exports.index);
};
