var mongoose = require('mongoose');


var Schema = mongoose.Schema;
//collection name dishes
var sliderSchema = new Schema({
    judul: String,
    subjudul: Date,
    img: { data: Buffer, contentType: String },
    foto: String,
    link: String
});

var Sliders = mongoose.model('slider', sliderSchema);

module.exports = Sliders;