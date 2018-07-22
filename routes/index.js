var express = require('express');
var router = express.Router();
var Event = require('../models/Event');

/* GET home page. */
//ambil tampilan render dari folder view berformat ejs
//tampilkan data event dengan limit 6 data saja.
router.get('/', function (req, res, next) {
  //res.render('pages/index', { title: 'Purwokerto Js' });
  //Tampilkan data dari mongodb
  Event.find({}, function (err, event) {
    console.log(event);
    res.render('pages/index', { events: event, title: 'Purwokerto Js' });
  }).select('judul tanggal penyelenggara tipe mulai selesai foto keterangan').limit(6);
});


//Menampilkan Detail Event
router.get('/detail/:id', function (req, res) {
  Event.findOne({ _id: req.params.id }, function (err, event) {
    if (event) {
      console.log(event);
      res.render('pages/detailevent', { title: "Judul Event", event: event });


    }
    else {
      req.flash('msg_error', 'Maaf, event tidak ditemukan!');
      res.redirect('http://localhost:3000/');
    }
  });
});




//Pencarian Data Event
router.post('/cari/', function (req, res) {
  var item = req.body.judul;
  var tanggal = req.body.tanggal;
  console.log(item);
  console.log(tanggal);

  Event.find({ judul: new RegExp(item, 'i'), tanggal: tanggal }, function (err, event) {
    if (event) {
      console.log(event);
      res.render('pages/hasilcari', { title: "Hasil Event", events: event });
    }
    else {
      console.log('Salah');
      
      res.render('pages/hasilcari', { title: "Hasil Event"});
      req.flash('info', 'Maaf, event tidak ditemukan!');
    }
  });
});



module.exports = router;