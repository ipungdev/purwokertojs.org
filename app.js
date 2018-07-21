// server.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');

var multer = require('multer');
var fs = require('fs');

/* Create App */
var app = express();

/* Setup Views */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
 
//app.use(session({cookie: { maxAge: 60000 }}));
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

/* panggil css js dll via path di src*/
app.use(express.static(path.join(__dirname, 'src')));

app.use(express.static('uploads'));

//load mongoose
var admin = require('./models/Admin');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//hubungkan ke Mongodb
mongoose.connect('mongodb://localhost/mo_purwokertojs')
  .then(() => console.log('Berhasil terhubung dengan MongoDB'))
  .catch((err) => console.error(err));
/*
var mongoose = require('mongoose');
let dev_db_url = 'mongodb://ipungdev:AllahMahaKaya9900@ds219051.mlab.com:19051/mo_purwokertojs';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/
console.log('MongoDB terkoneksi');


//Buat route pada app.js
var home = require('./routes/index');
var about = require('./routes/about');
var meetup = require('./routes/meetup');
var register = require('./routes/daftar');
var contact = require('./routes/contact');
var test = require('./routes/test');
var loginmember = require('./routes/login');
var selamat = require('./routes/selamat');

//Routes buat admin dashboard
var dashboard = require('./routes/administrator/dashboard');
var tambah = require('./routes/administrator/events');
var login = require('./routes/administrator/login');

var events = require('./routes/administrator/events');
var member = require('./routes/administrator/member');
//var base_url = require('./routes/base_url');

//pasang routes
//app.use('/base_url',base_url);
app.use('/', home);
app.use('/abouts', about);
app.use('/meetup', meetup);
app.use('/contact', contact);
app.use('/register', register);
app.use('/test', test);
app.use('/login',loginmember);
app.use('/selamat',selamat);


//pasang routes backend admin
app.use('/administrator/dashboard', dashboard);
app.use('/administrator/tambah', tambah);
app.use('/administrator/login', login);
app.use('/administrator/events',events);
app.use('/administrator/member',member);



/* Create Server */
var port = 3000;
app.listen(port, function(){
  console.log('listening on port: '+ port)
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

