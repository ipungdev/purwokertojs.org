var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var test = require("../controllers/TestController.js");

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/testform', { title: 'Register Purwokerto Js' });
});

//fungsi POST
router.post('/save', function(req, res) {
  test.save(req, res);
});

module.exports = router;