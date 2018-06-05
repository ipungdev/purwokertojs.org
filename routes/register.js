var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var User = require('../models/User.js');
var user = require("../controllers/UserController.js");

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/register', { title: 'Register Purwokerto Js' });
});

//fungsi POST
router.post('/reg', function(req, res) {
  user.save(req, res);
});

module.exports = router;