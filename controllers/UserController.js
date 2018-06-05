var mongoose = require("mongoose");
var User = require("../models/User");

var userController = {};


// Save new employee
userController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pages/register");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/abouts");
    }
  });
};



module.exports = userController;