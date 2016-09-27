var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    facebook:{
        id:Number,
        firstName:String,
        lastName:String
    },
    pollList:[String]
});

module.exports = mongoose.model('User',userSchema);