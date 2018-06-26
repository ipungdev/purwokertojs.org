var mongoose = require('mongoose');
var crypto = require('crypto');

var secret = 'purwokertojs';
var password = crypto.createHmac('sha256', secret)
                   .update('rahasia123')
                   .digest('hex');

console.log("Password: " + password);

//var mongoose = require('mongoose');
let dev_db_url = 'mongodb://ipungdev:AllahMahaKaya9900@ds219051.mlab.com:19051/mo_purwokertojs';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Admin = require('../models/Admin');

Admin.find({username:'superadmin'}, function (err, user){
    if (user.length == 0)
    {
        var admin = new Admin({
            username: 'superadmin',
            email: 'admin@example.com',
            password: password,
            firstname: 'super',
            lastname: 'admin',
            admin: true,
        });

        admin.save(function(err) {
          if (err) throw err;

          console.log('Admin is created!');
        });
    }
});

