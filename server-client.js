/**
 * Created by ing507 on 7/6/16.
 */

var session = require('client-sessions');

app.use(session({
    cookieName: 'session',// cookie name dictates the key name added to the request object
    secret: 'shielakijawani',
    duration: 24 * 60 * 60 * 1000,//defines how long the session will live in milliseconds
    activeDuration: 1000 * 60 * 5,// activeDuration prevents the app from logging a user out while they’re still using the site.
    cookie: {
        path: '/api', // cookie will only be sent to requests under '/api'
        maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
        ephemeral: true, // when true, cookie expires when the browser closes
        httpOnly: false, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
}));

app.post('/api/user/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            res.render('login.jade', { error: 'Invalid email or password.' });
        } else {
            if (req.body.password === user.password) {
                // sets a cookie with the user's info
                req.session.user = user;
                res.redirect('/api/user/dashboard');
            } else {
                res.render('login.jade', { error: 'Invalid email or password.' });
            }
        }
    });
});

app.get('/api/user/dashboard', function(req, res) {
    if (req.session && req.session.user) { // Check if session exists
        // lookup the user in the DB by pulling their email from the session
        User.findOne({ email: req.session.user.email }, function (err, user) {
            if (!user) {
                // if the user isn't found in the DB, reset the session info and
                // redirect the user to the login page
                req.session.reset();
                res.redirect('/api/user/login');
            } else {
                // expose the user to the template
                res.locals.user = user;

                // render the dashboard page
                res.render('dashboard.jade');
            }
        });
    } else {
        res.redirect('/api/user/login');
    }
});


app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user;  //refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
            next();
        });
    } else {
        next();
    }
});


function requireLogin (req, res, next) {
    if (!req.user) {
        res.redirect('/api/user/login');
    } else {
        next();
    }
};


app.get('/api/user/dashboard', requireLogin, function(req, res) {
    res.render('dashboard.jade');
});

app.get('/api/user/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
});