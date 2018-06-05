var express = require('express');
var router = express.Router();

/* GET meetup page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/register', { title: 'Register Purwokerto Js' });
});

module.exports = router;