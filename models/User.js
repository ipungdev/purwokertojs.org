var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
    username: String,
    email: String,
    address: String
});

module.exports = mongoose.model('User', UserSchema);