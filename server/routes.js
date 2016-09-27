

'use strict';

var path = process.cwd();
module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/#/list");
        }
    }
    
   
    
    app.route('/login')
    .get(function (req, res) {
        res.sendFile('/home/ubuntu/workspace/client/index.html');
    });

    app.route('/logout')
    .get(function (req, res) {
        //console.log("logging out");
        req.logout();
        res.redirect('/#/list');
    });
    
    app.route('/profile')
    .get(isLoggedIn, function (req, res) {
        //res.sendFile(path + '/public/profile.html');
        res.json(req.user);
    });

    
    app.route('/check')
    .get(function (req, res) {
        res.send(req.isAuthenticated()?'1':'0');
    });
    
    app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/error'
    }
    ));


};