var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//collection name dishes
var eventSchema = new Schema({
    judul: String,
    tanggal: Date,
    penyelenggara: String,
    tipe: String,
    mulai: String,
    selesai: String,
    img: { data: Buffer, contentType: String },
    foto: String,
    keterangan: String
});

var Events = mongoose.model('event', eventSchema);

module.exports = Events;