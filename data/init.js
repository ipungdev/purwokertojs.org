var mongoose = require('mongoose');
var crypto = require('crypto');

var secret = 'purwokertojs';
var password = crypto.createHmac('sha256', secret)
                   .update('rahasia123')
                   .digest('hex');

console.log("Password: " + password);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mo_purwokertojs');


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

