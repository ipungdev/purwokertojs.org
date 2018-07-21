var express = require('express');
var router = express.Router();
var app = express();
var Member = require('../../models/Member');
var Auth_mdw = require('../../middlewares/auth');

//Tampilkan semua data member
router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    //Tampilkan data dari mongodb
    Member.find({}, function (err, member) {
        console.log(member);
        res.render('backend/member', { session_store: session_store, members: member });
    }).select('username email password phone alamat');
    //res.render('backend/dashboard', { session_store:session_store });
});

/* From tambah member */
router.get('/tambah', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    res.render('backend/tambahmember', { session_store: session_store });
});

// Save member
router.post('/save',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    var member = new Member(req.body);

    member.save(function (err) {
        if (err) {
            console.log(err);
            res.render("backend/tambahmember");
        } else {
            console.log("Successfully created an member.");
            res.redirect('http://localhost:3000/administrator/member');
        }
    });
});

//Ambil form edit
router.get('/edit/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    session_store = req.session;
    Member.findOne({ _id: req.params.id }, function (err, member) {
        if (member) {
            console.log(member);
            res.render('backend/editmember', { session_store: session_store, member: member });


        }
        else {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/dashboard');
        }
    });
});

// Edit update
router.post('/update/:id',Auth_mdw.check_login, Auth_mdw.is_admin,  function (req, res) {
    Member.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username, email: req.body.email, password: req.body.password, phone: req.body.phone, alamat: req.body.alamat } }, { new: true }, function (err, member) {
        if (err) {
            console.log(err);
            res.render('backend/editmember', { member: req.body });
        }
        res.redirect('http://localhost:3000/administrator/member');
    });
});

//Delete
router.get('/delete/(:id)', Auth_mdw.check_login, Auth_mdw.is_admin, function (req, res, next) {
    session_store = req.session;
    Member.findOne({ _id: req.params.id }, function (err, row) {
        if (row) {
            console.log(row);

            Member.remove({_id: req.params.id}, function(err) {
     
                // If error exists display it
                if(err) {
                    console.log("Delete Member Error", err);
                }
                else {
                    console.log("Member deleted!");
                    res.redirect('http://localhost:3000/administrator/member');
                }
            });
        }
        else {
            req.flash('msg_error', 'Maaf, event tidak ditemukan!');
            res.redirect('http://localhost:3000/administrator/member');
        }
    });
});








module.exports = router;