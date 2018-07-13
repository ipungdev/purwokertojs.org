var express = require('express');
var uploadrouter = express.Router();
var Auth_mdw = require('../../middlewares/auth');

var crypto = require('crypto');
var secret = 'purwokertojs';
var session_store;

var multer = require('multer');
var app = express();

var Schema = mongoose.Schema;
var fs = require('fs');

var eventSchema = new Schema(
    {
        username: String,
        img:
            { data: Buffer, contentType: String }
    }
);
var Event = mongoose.model('User', eventSchema);

var newEvent = new Event;

/* GET about page. 
//ambil tampilan render dari folder view berformat ejs
router.get('/', function(req, res, next) {
  res.render('backend/dashboard', { title: 'Dashboard Purwokerto Js' });
});

router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
  session_store = req.session;
  res.render('backend/tambahevent', { session_store:session_store });
});*/


uploadrouter.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    res.render('backend/tambahevent', { session_store: session_store });
});

uploadrouter.post('/', multer({ dest: './uploads/' }).single('upl'), function (req, res, next) {

    console.log(req.body); //form fields

    console.log(req.file);

    newUser.username = req.body.username;

    newUser.img.data = fs.readFileSync(req.file.path);

    newUser.img.contentType = req.file.mimetype;

    newUser.save(function (err, newUser) {
        if (err) throw err;
        console.log(newUser);
    });
    res.redirect('/dishes/profile/' + req.body.username);

});


dishRouter.get('/profile/:userid/picture', function (req, res) {
    User.findById({ '_id': req.params.userid }, function (err, results) {
        if (err) throw err;
        res.contentType(results.img.contentType);
        res.send(results.img.data);
    });
});

// Get profile
dishRouter.get('/profile/:username', function (req, res) {
    User.findOne(
        { 'username': req.params.username },
        function (err, results) {
            if (err) return next(err);
            res.render('show', {
                username: results.username,
                userid: results._id
            });
        });
});


app.use('/dishes', uploadrouter);

module.exports = uploadrouter;

//module.exports = router;