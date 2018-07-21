var express = require('express');
var router = express.Router();
var app = express();
var Event = require('../../models/Event');
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

/* From tambah event */


/* From tambah event */
router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    res.render('backend/tambahevent', { session_store: session_store });
});

//Post data dengan upload image dengan multer
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }
        var data = new Event({
            judul: req.body.judul,
            tanggal: req.body.tanggal,
            penyelenggara: req.body.penyelenggara,
            tipe: req.body.tipe,
            mulai: req.body.mulai,
            selesai: req.body.selesai,
            foto: req.file.originalname,
            keterangan: req.body.keterangan
        });
        data.save().then((result) => {
            res.send(result);
        });
        console.log(req.file);
        //res.end('upload file success');
        res.redirect('http://localhost:3000/administrator/dashboard');
        console.log('success');
    });
});

//Ambil form edit
router.get('/edit/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    session_store = req.session;
    Event.findOne({ _id: req.params.id }, function (err, event) {
        if (event) {
            console.log(event);
            res.render('backend/editevent', { session_store: session_store, event: event });


        }
        else {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/dashboard');
        }
    });
});


// Edit update
/*
router.post('/update/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    Member.findByIdAndUpdate(req.params.id, { $set: { judul: req.body.judul, tanggal: req.body.tanggal, penyelenggara: req.body.penyelenggara, tipe: req.body.tipe, mulai: req.body.mulai, selesai: req.body.selesai, foto: req.body.foto, keterangan: req.body.keterangan } }, { new: true }, function (err, member) {
        if (err) {
            console.log(err);
            res.render('backend/editevent', { member: req.body });
        }
        res.redirect('http://localhost:3000/administrator/dashboard');
    });
});*/

router.post('/update/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }
        Event.findByIdAndUpdate(req.params.id, { $set: { judul: req.body.judul, tanggal: req.body.tanggal, penyelenggara: req.body.penyelenggara, tipe: req.body.tipe, mulai: req.body.mulai, selesai: req.body.selesai, foto: req.file.originalname, keterangan: req.body.keterangan } }, { new: true }, function (err, event) {
            if (err) {
                console.log(err);
                res.render('backend/editevent', { event: req.body });
            }
        });

        console.log(req.file);
        //res.end('upload file success');
        res.redirect('http://localhost:3000/administrator/dashboard');
        console.log('success');
    });
});


//Delete Events
router.get('/delete/(:id)', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    Event.findOne({ _id: req.params.id }, function (err, row) {
        if (row) {
            console.log(row);

            Event.remove({_id: req.params.id}, function(err) {
     
                // If error exists display it
                if(err) {
                    console.log("Delete Event Error", err);
                }
                else {
                    console.log("Event deleted!");
                    res.redirect('http://localhost:3000/administrator/dashboard');
                }
            });
        }
        else {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/dashboard');
        }
    });
});


module.exports = router;