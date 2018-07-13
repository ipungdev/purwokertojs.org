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

/* GET home page. */
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



router.get('/:id', (req, res) => {
    var id = req.params.id
    Image.findById(id).then((result) => {
        res.render('image', { text: result.text, image: result.image });
    }).catch((e) => res.send(e));
});

router.delete('/:id', (req, res) => {
    Image.remove({ _id: req.params.id }).then(() => {
        res.send({ message: 'delete success' });
    }).catch((e) => {
        res.send(e);
    });
});

module.exports = router;