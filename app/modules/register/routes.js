var express = require('express');
var router = express.Router();
var auth = require( './auth');
var nodemailer= require('nodemailer');
var xoauth2= require('xoauth2');

router.get('/', (req, res) => {
  var db = require('../../lib/database')();
  res.render('register/views/index');
});

// router.post('/',(req, res) => {
//   var db = require('../../lib/database')();
//   db.query(`INSERT INTO tbluser (strName, datBirthday, strAddress, strEmail, strPassword, strGender, strFavCoffee, strType, strStatus, strPicture, strPicture2, strPicture3, strPicture4, strPicture5)  VALUES ("${req.body.name}","${req.body.bday}","${req.body.address}", "${req.body.email}", "${req.body.password}","${req.body.gender}","${req.body.favcoffee}","1", "unregistered", "blank.jpg","blank.jpg","blank.jpg","blank.jpg","blank.jpg")`, (err, results, fields) => {
//     if (err) console.log(err);
//       res.redirect('/login');
//   });
// });

router.post('/',auth,(req, res) => {
  var db = require('../../lib/database')();
  if(req.body.password!=req.body.confirm){
    res.render('admin/invalid/register_invalid_password')
  }
  else{
    db.query(`INSERT INTO tbluser (strName, datBirthday, strAddress, strEmail, strPassword, strGender, strFavCoffee, strType, strStatus, strPicture, strPicture2, strPicture3, strPicture4, strPicture5, strBio)  VALUES ("${req.body.name}","${req.body.bday}","${req.body.address}", "${req.body.email}", "${req.body.password}", "${req.body.gender}", "${req.body.favcoffee}","1", "unregistered", "${req.body.profilepic}","blank.jpg","blank.jpg","blank.jpg","blank.jpg", "")`, (err, results, fields) => {
    if (err) console.log(err);
      res.redirect('/login');
    });
  }
});


exports.register = router;
