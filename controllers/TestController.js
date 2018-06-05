var mongoose = require("mongoose");
var Test = require("../models/Test");

var testController = {};


// Save new employee
testController.save = function(req, res) {
  var test = new Test(req.body);

  test.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pages/testform");
    } else {
      console.log("Successfully created an test.");
      res.redirect("/abouts");
    }
  });
};



module.exports = testController;