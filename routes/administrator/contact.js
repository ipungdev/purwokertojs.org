var express = require('express');
var router = express.Router();
var app = express();
var Contact = require('../../models/Contact');
var Auth_mdw = require('../../middlewares/auth');

//Tampilkan semua data member
router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    //Tampilkan data dari mongodb
    Contact.find({}, function (err, contact) {
        console.log(contact);
        res.render('backend/contact', { session_store: session_store, contacts: contact });
    }).select('firstname lastname email phone pesan');
    //res.render('backend/dashboard', { session_store:session_store });
});







module.exports = router;