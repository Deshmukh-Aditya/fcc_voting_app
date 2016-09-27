'use strict';

var User = require('../models/user.js');

function pollList () {

    this.getList = function (req, res) {
        User
            .findOne({ 'facebook.id': req.user.facebook.id }, { '_id': false })
            .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result.pollList);
            });
    };

}