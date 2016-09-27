'use strict';

var facebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var configAuth = require('../facebook/auth');

module.exports = function(passport){
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    passport.use(new facebookStrategy({
         clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                }
                else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.firstName = profile.displayName;
                    newUser.facebook.lastName = profile.last_name;
                    newUser.pollList = [];
                    

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};