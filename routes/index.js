var express = require('express');
var router = express.Router();
var Event = require('../models/Event');

/* GET home page. */
//ambil tampilan render dari folder view berformat ejs
//tampilkan data event dengan limit 6 data saja.
router.get('/', function(req, res, next) {
  //res.render('pages/index', { title: 'Purwokerto Js' });
  //Tampilkan data dari mongodb
  Event.find({}, function (err, event) {
    console.log(event);
    res.render('pages/index', {events: event ,title: 'Purwokerto Js'});
  }).select('judul tanggal penyelenggara tipe mulai selesai foto keterangan').limit(6);
});

module.exports = router;