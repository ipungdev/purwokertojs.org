var express = require('express');
var router = express.Router();
var Meetup = require('../models/Meetup');

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs


router.get('/', function(req, res, next) {
  //res.render('pages/index', { title: 'Purwokerto Js' });
  //Tampilkan data dari mongodb
  Meetup.find({}, function (err, meetup) {
    console.log(meetup);
    res.render('pages/meetup', {meetup: meetup ,title: 'Meetup Purwokerto Js'});
  }).select('judul sub foto keterangan').limit(9);
});

//Menampilkan Detail Meetup
router.get('/detail/:id', function (req, res) {
  Meetup.findOne({ _id: req.params.id }, function (err, meetup) {
      if (meetup) {
          console.log(meetup);
          res.render('pages/detailmeetup', { title: "Judul Event", meetup: meetup });


      }
      else {
          req.flash('msg_error', 'Maaf, event tidak ditemukan!');
          res.redirect('http://localhost:3000/');
      }
  });
});

module.exports = router;