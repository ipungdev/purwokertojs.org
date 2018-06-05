var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
    username: String,
    email: String,
    address: String
});

module.exports = mongoose.model('Test', TestSchema);