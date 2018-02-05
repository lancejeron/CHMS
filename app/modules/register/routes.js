var express = require('express');
var router = express.Router();
var auth = require( './auth');
var nodemailer= require('nodemailer');
var xoauth2= require('xoauth2');

router.get('/', (req, res) => {
  var db = require('../../lib/database')();
  res.render('register/views/index');
});

router.post('/',(req, res) => {
var db = require('../../lib/database')();
db.query(`INSERT INTO tbluser (strName, datBirthday, strAddress, strEmail, strPassword, strFavCoffee, strType, strStatus, strProfilePicture)  VALUES ("${req.body.name}","${req.body.bday}","${req.body.address}", "${req.body.email}", "${req.body.password}","${req.body.favcoffee}","1", "unregistered", "${req.body.profilepic}" )`, (err, results, fields) => {
    if (err) console.log(err);
  });
// alert('A verification link has been sent to your Email')
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//          xoauth2: xoauth2.createXOAuth2Generator ({
//            user: 'cfmteam2018@gmail.com',
//            clientId:'377492543487-v66d4v1s9hoog7n3g3v5onovtqvpkt2t.apps.googleusercontent.com',
//            clientSecret:'9n21PJ7J1sFnUJgxVNnbpVPq',
//            refreshToken: '1/4ZI8y00j_JmuIniqMdujvfghj0NgNY7XLFWL5-bi13w'
//          })
//      }
//  });

//  var mailOptions = {
//   from: 'Coffeemate Team <cfmteam2018@gmail.com>', // sender address
//   to: 'lancejeron26@gmail.com', // list of receivers
//   subject: 'Coffeemate Account Verification', // Subject line
//   text: 'Click the link below to verify.' // plain text body
// };

// transporter.sendMail(mailOptions, function (err, res) {
//   if(err)
//     console.log(err)
//   else
//     console.log('Email is Sent');
//   });   
//   res.redirect('/login');
});


exports.register = router;
