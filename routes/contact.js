var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'Contact Purwokerto Js' });
});

// Save member
router.post('/save', function(req, res) {
  var contact = new Contact(req.body);

  contact.save(function(err) {
    if(err) {
      console.log(err);
      res.render("pages/contact");
    } else {
      console.log("Successfully mengirim pesan.");
      res.redirect('http://localhost:3000/contact');
    }
  });
});

module.exports = router;