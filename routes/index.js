var express = require('express');
var router = express.Router();

/* GET home page. */
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Purwokerto Js' });
});

module.exports = router;