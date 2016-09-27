var mongoose = require('mongoose');


var pollSchema = new mongoose.Schema({
    question:String,
    vote: [{
        option: String,
        count: Number
    }]
});

module.exports = mongoose.model('poll',pollSchema);


