var express = require('express');
var router = express.Router();
var Auth_mdw = require('../../middlewares/auth');
var Event = require('../../models/Event');
var crypto = require('crypto');
var Admin = require('../../models/Admin');
var secret = 'purwokertojs';
var session_store;

/* GET about page. 
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('backend/dashboard', { title: 'Dashboard Purwokerto Js' });
});*/

router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
  session_store = req.session;
  Event.find({}, function(err, event){
    console.log(event);
    res.render('backend/dashboard', { session_store:session_store, events: event });
}).select('judul tanggal penyelenggara tipe mulai selesai foto keterangan');
  //res.render('backend/dashboard', { session_store:session_store });
});

module.exports = router;

