var mongoose = require('mongoose');


var Schema = mongoose.Schema;
//collection name dishes
var memberSchema = new Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    alamat: String
});

var Members = mongoose.model('member', memberSchema);

module.exports = Members;