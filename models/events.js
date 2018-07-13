var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//collection name dishes

var eventSchema = new Schema({
  username: String,
  img: { data: Buffer, contentType: String }
});

var events = mongoose.model('dish', eventSchema);


module.exports= events;