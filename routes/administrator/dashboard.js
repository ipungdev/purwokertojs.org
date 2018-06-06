var express = require('express');
var router = express.Router();

/* GET about page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('backend/dashboard', { title: 'Dashboard Purwokerto Js' });
});

module.exports = router;