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
            console.log(member);
            res.render('backend/editevent', { session_store: session_store, event: event });


        }
        else {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/dashboard');
        }
    });
});

/*

router.get('/edit/:id', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the product model to look up the product with this id    
    Event.findById(id, function (err, event) {
        if (err) {
            res.send('Event ' + id + ' not found');
        }
        else {
            res.render('backend/editevent', { event: event });
        }
    });
});

// POST /products/edit/:id - update selected product */
router.post('/update/(:id)', function (req, res, next) {
    req.assert('judul', 'Nim is required').notEmpty();           //Validate name
    req.assert('tanggal', 'Nama is required').notEmpty();             //Validate age
    req.assert('penyelenggara', 'A valid email is required').isEmail();  //Validate email
    req.assert('tipe', 'Phone is required').notEmpty();


    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        /********************************************
         * Express-validator module
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var event = {
            judul: req.sanitize('judul').escape().trim(),
            tanggal: req.sanitize('tanggal').escape().trim(),
            penyelenggara: req.sanitize('penyelenggara').escape().trim(),
            tipe: req.sanitize('tipe').escape().trim()
        }

        var o_id = new ObjectId(req.params.id)
        Event.update({ "_id": o_id }, event, function (err, result) {
            if (err) {
                req.flash('error', err);

                // render to views/user/edit.ejs
                res.render('backend/editevent', {
                    title: 'Edit User',
                    id: req.params.id,
                    judul: req.body.judul,
                    tanggal: req.body.tanggal,
                    penyelenggara: req.body.penyelenggara,
                    tipe: req.body.tipe
                });
            } else {
                req.flash('success', 'Data berhasil diupdate!');

                res.redirect('http://localhost:3000/administrator/dashboard');

                // render to views/user/edit.ejs
                /*res.render('user/edit', {
                    title: 'Edit User',
                    id: req.params.id,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                })*/
            }
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        });
        req.flash('error', error_msg);

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('backend/editevent', {
            title: 'Edit Event',
            id: req.params.id,
            judul: req.body.judul,
            tanggal: req.body.tanggal,
            penyelenggara: req.body.penyelenggara,
            tipe: req.bosy.tipe
        });
    }
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