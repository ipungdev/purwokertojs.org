var mongoose = require('mongoose');


var Schema = mongoose.Schema;
//collection name dishes
var contactSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    pesan: String
});

var Contacts = mongoose.model('contact', memberSchema);

module.exports = Contacts;