var express = require('express');
var router = express.Router();
var app = express();
var Meetup = require('../../models/Meetup');
var multer = require('multer');
var Auth_mdw = require('../../middlewares/auth');
//var Image = require('./../models/image');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('upl');

// var upload = multer({dest: 'uploads/'});

/* From tambah meetup */


/* data meetup */
router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    //Tampilkan data dari mongodb
    Meetup.find({}, function (err, meetup) {
      console.log(meetup);
      res.render('backend/meetup', { session_store: session_store, meetup: meetup });
    }).select('judul sub foto keterangan');
    //res.render('backend/dashboard', { session_store:session_store });
  });

  /* From tambah meetup */
router.get('/tambah', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    res.render('backend/tambahmeetup', { session_store: session_store });
});

//Post data dengan upload image dengan multer
router.post('/save', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }
        var data = new Meetup({
            judul: req.body.judul,
            sub: req.body.sub,
            foto: req.file.originalname,
            keterangan: req.body.keterangan
        });
        data.save().then((result) => {
            res.send(result);
        });
        console.log(req.file);
        //res.end('upload file success');
        res.redirect('http://localhost:3000/administrator/meetup');
        console.log('success');
    });
});

//Ambil form edit
router.get('/edit/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    session_store = req.session;
    Meetup.findOne({ _id: req.params.id }, function (err, meetup) {
        if (meetup) {
            console.log(meetup);
            res.render('backend/editmeetup', { session_store: session_store, meetup: meetup });


        }
        else {
            req.flash('msg_error', 'Maaf, meetup tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/meetup');
        }
    });
});


// Edit update
/*
router.post('/update/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    Member.findByIdAndUpdate(req.params.id, { $set: { judul: req.body.judul, tanggal: req.body.tanggal, penyelenggara: req.body.penyelenggara, tipe: req.body.tipe, mulai: req.body.mulai, selesai: req.body.selesai, foto: req.body.foto, keterangan: req.body.keterangan } }, { new: true }, function (err, member) {
        if (err) {
            console.log(err);
            res.render('backend/editmeetup', { member: req.body });
        }
        res.redirect('http://localhost:3000/administrator/dashboard');
    });
});*/

router.post('/update/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }
        Meetup.findByIdAndUpdate(req.params.id, { $set: { judul: req.body.judul, sub: req.body.sub, foto: req.file.originalname, keterangan: req.body.keterangan } }, { new: true }, function (err, meetup) {
            if (err) {
                console.log(err);
                res.render('backend/editmeetup', { meetup: req.body });
            }
        });

        console.log(req.file);
        //res.end('upload file success');
        res.redirect('http://localhost:3000/administrator/meetup');
        console.log('success');
    });
});


//Delete Meetup
router.get('/delete/(:id)', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    Meetup.findOne({ _id: req.params.id }, function (err, row) {
        if (row) {
            console.log(row);

            Meetup.remove({_id: req.params.id}, function(err) {
     
                // If error exists display it
                if(err) {
                    console.log("Delete meetup Error", err);
                }
                else {
                    console.log("meetup deleted!");
                    res.redirect('http://localhost:3000/administrator/meetup');
                }
            });
        }
        else {
            req.flash('msg_error', 'Maaf, meetup tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/meetup');
        }
    });
});


module.exports = router;