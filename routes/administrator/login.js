var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Admin = require('../../models/Admin');
var Auth_mdw = require('../../middlewares/auth');

var secret = 'purwokertojs';
var session_store;


/* GET login page. */
//ambil tampilan render dari folder view berformat ejs

router.get('/', function(req, res, next) {
  res.render('backend/login', { title: 'Dashboard Purwokerto Js' });
});

router.post('/go', function (req, res, next) {
  session_store = req.session;
  var password = crypto.createHmac('sha256', secret)
    .update(req.param('password'))
    .digest('hex');

  if (req.param('username') == "" || req.param('password') == "") {
    req.flash('info', 'Maaf, tidak boleh ada field yang kosong!');
    res.redirect('/administrator/login');
  }
  else {
    Admin.find({ username: req.param('username'), password: password }, function (err, user) {
      if (err) throw err;

      if (user.length > 0) {
        session_store.username = user[0].username;
        session_store.email = user[0].email;
        session_store.admin = user[0].admin;
        session_store.logged_in = true;

        res.redirect('/administrator/dashboard');
      }
      else {
        //req.flash('info', 'Sepertinya akun Anda salah!');
        req.flash('msg', 'Sepertinya akun Anda salah!');
        res.locals.message = req.flash();
        res.redirect('/administrator/login');
      }

    });
  }
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
  if(err){
    console.log(err);
  }
  else
  {
    res.redirect('/administrator/login');
  }
});
});

module.exports = router;