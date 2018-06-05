// server.js
var express = require('express');
var path = require('path');

/* Create App */
var app = express();

/* Setup Views */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* panggil css js dll via path di src*/
app.use(express.static(path.join(__dirname, 'src')));


//Buat route pada app.js
var home = require('./routes/index');
var about = require('./routes/about');
var meetup = require('./routes/meetup');
var register = require('./routes/register');

//pasang routes
app.use('/', home);
app.use('/abouts', about);
app.use('/meetup', meetup);
app.use('/register', register);


/* Create Server */
var port = 3000;
app.listen(port, function(){
  console.log('listening on port: '+ port)
});

