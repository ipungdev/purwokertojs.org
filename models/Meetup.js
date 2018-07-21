var mongoose = require('mongoose');


var Schema = mongoose.Schema;
//collection name dishes
var meetupSchema = new Schema({
    judul: String,
    sub: String,
    img: { data: Buffer, contentType: String },
    foto: String,
    keterangan: String
});

var Meetups = mongoose.model('meetup', meetupSchema);

module.exports = Meetups;