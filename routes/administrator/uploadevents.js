var express = require('express');
var router = express.Router();
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

router.get('/edit/(:id)', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next){
    session_store = req.session;

    Event.findOne({_id:req.params.id}, function (err, row){
        if (row)
        {
            console.log(row);

           // tanggal_lahir = moment(row.tanggal_lahir).format("YYYY-MM-DD");
            res.render('backend/editevent', { 
                session_store:session_store, 
                title:"Edit Events", 
                judul: row.judul,
                tanggal:row.tanggal,
                penyelenggara:row.penyelenggara,
                tipe:row.tipe,
                mulai:row.mulai,
                selesai:row.selesai,
                foto:row.foto,
                keterangan:row.keterangan
            });
            
        }
        else
        {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('/dashboard');
        }
    });
});


// SHOW EDIT USER FORM
/*router.get('/edit/(:id)', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next){
    var o_id = new ObjectId(req.params.id)
    session_store = req.session
    req.db.collection('events').find({"_id": o_id}).toArray(function(err, result) {
        if(err) return console.log(err)

        // if user not found
        if (!result) {
            req.flash('error', 'Event tidak ada dengan id = ' + req.params.id)
            res.redirect('http://localhost:3000/administrator/dashboard')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            res.render('backend/editevent', {
                title: 'Edit Events',
                session_store: session_store,
                //data: rows[0],
                id: result[0]._id,
                judul: result[0].judul,
                tanggal: result[0].tanggal,
                penyelenggara: result[0].penyelenggara,
                mulai: result[0].mulai
            })
        }
    })
})*/


module.exports = router;