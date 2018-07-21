var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/daftar', { title: 'Daftar Purwokerto Js' });
});


// Save member
router.post('/save', function(req, res) {
  var member = new Member(req.body);

  member.save(function(err) {
    if(err) {
      console.log(err);
      res.render("pages/daftar");
    } else {
      console.log("Successfully created an member.");
      res.redirect('http://localhost:3000/selamat');
    }
  });
});



module.exports = router;