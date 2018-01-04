var express = require('express');
var router = express.Router();
var auth = require( './auth');

router.get('/', (req, res) => {
  var db = require('../../lib/database')();
  res.render('register/views/index');
});

router.post('/',(req, res) => {
var db = require('../../lib/database')();
db.query(`INSERT INTO tbluser (strName, strEmail, txtContact, strPassword, strStatus, intCommend, intReport, strProfilePicture)  VALUES ("${req.body.name}", "${req.body.email}", "${req.body.contact}", "${req.body.password}", "unregistered", "0", "0", "blank.jpg" )`, (err, results, fields) => {
    if (err) console.log(err);
    res.redirect('/login');
});
});


// var questArray = [], rand = [], choice = [];
// var registerOn = 0, testOn = 0;
// var tempRegister = {studnum:"" , studname:"", email:"", contact:"", password:""};

// function fquestrand1(req, res, next){
//     var db = require('../../lib/database')();
//     db.query("SELECT * FROM tblquestions WHERE boolUsed= '0'", (err, results, fields) => {
//       questArray = [];
//       rand = [];
//       if (err) console.log(err);
//       for(count=0;count<results.length;count++){
//         questArray[count] = results[count].intQuestionID;
//       }
//       for(count=0;count<10;count++){
//         rand[count]= questArray[Math.floor(Math.random()*questArray.length)]
//         questArray.splice(questArray.indexOf(rand[count]),1);
//       }
//       return next();
//     });
// }
// function fquestrand2(req, res, next){
//     var db = require('../../lib/database')();
//     for(count=0;count<10;count++){
//       db.query("UPDATE tblquestions SET boolUsed= '1' WHERE intQuestionID= ? ",[rand[count]], (err, results2, fields) => {
//         if (err) console.log(err);
//         return next();
//       });
//     }
// }
// function fquestions(req, res, next){
//     var db = require('../../lib/database')();
//     db.query("SELECT * FROM tblquestions WHERE boolUsed= '1'", (err, results, fields) => {
//       if (err) console.log(err);
//       if (!results[0]){
//         res.render('register/views/regoff');
//       }
//       else{
//         for(count= 0;count<10;count++){
//           results[count].itemnum = count + 1;
//         }
//       }
//       req.questions = results;
//       return next();
//     });
// }
// function fchoices(req, res, next){
//     var db = require('../../lib/database')();
//     db.query("SELECT * FROM tblquestions INNER JOIN tblchoices ON intQuestionID = intChQuestionID WHERE boolUsed = 1", (err, results, fields) => {
//       if (err) console.log(err);
//       req.choices = results;
//       return next();
//     });
// }
// function fcleanse(req, res, next){
//     var db = require('../../lib/database')();
//     db.query("UPDATE tblquestions SET boolUsed= '0' WHERE boolUsed= '1'", (err, results, fields) => {
//       if (err) console.log(err);
//       return next();
//     });
// }

// function render(req,res){
//     registerOn = 0;
//     testOn = 1;
//     req.session.user = '';
//     res.render('register/views/index');
// }
// function randrender(req,res){
//   req.session.user = '';
//   if (registerOn == 1)
//     res.render('register/views/rand');
//   else
//     res.render('register/views/regoff');
// }
// function CHrender(req,res){
//     req.session.user = '';
//     if (registerOn == 1){
//       testOn = 1;
//       res.render('register/views/questions', { questiontab: req.questions , choicetab: req.choices });
//     }
//     else
//       res.render('register/views/regoff');
// }
// function FINrender(req,res){
//     req.session.user = '';
//     if (registerOn == 1){
//       if (testOn == 0){
//         res.render('register/views/regformfin');
//         registerOn = 0;
//       }
//       else{
//         res.render('register/views/teston');
//       }
//     }
//     else
//       res.render('register/views/regoff');
// }

// router.get('/', fcleanse, render);
// router.get('/start', fcleanse, fquestrand1, fquestrand2, randrender);
// router.get('/test', fquestions, fchoices, CHrender);
// router.get('/fin', FINrender);

// router.post('/', auth, (req, res) => {
//     var db = require('../../lib/database')();
//     if(req.body.password === req.body.confirm && req.body.password != ""){
//     tempRegister.studnum = req.body.studnum;
//     tempRegister.studname = req.body.studname;
//     tempRegister.email = req.body.email;
//     tempRegister.contact = req.body.contact;
//     tempRegister.password = req.body.password;
//     registerOn = 1;
//     res.redirect('/register/start');
//     }
//     else{
//       res.render('register/views/invalidpages/notmatch');
//     }
// });
// router.post('/test', fquestions, fchoices, (req, res) => {
//     var db = require('../../lib/database')();
//     choice = [ req.body.choice1, req.body.choice2, req.body.choice3, req.body.choice4, req.body.choice5, req.body.choice6, req.body.choice7, req.body.choice8, req.body.choice9, req.body.choice10 ];
//     if(!req.body.choice1 || !req.body.choice2 || !req.body.choice3 || !req.body.choice4 || !req.body.choice5 || !req.body.choice6 || !req.body.choice7 || !req.body.choice8 || !req.body.choice9 || !req.body.choice10 ){
//       res.render('register/views/invalidpages/blankquest',{ questiontab: req.questions , choicetab: req.choices });
//     }
//     else{
//       testOn = 0;
//       db.query("INSERT INTO tbluser (strSNum, strName, strEmail, txtContact, strPassword, strStatus, intCommend, intReport, strProfilePicture) VALUES (?,?,?,?,?,'unregistered','0','0','blank.jpg')",[tempRegister.studnum,tempRegister.studname,tempRegister.email,tempRegister.contact,tempRegister.password], (err, results, fields) => {
//           if (err) console.log(err);
//           for(count=0;count<10;count++){
//             db.query("INSERT INTO tblanswers (strAnswerSNum, intAnswer) VALUES (?,?)",[tempRegister.studnum, choice[count]], (err, results, fields) => {
//               if (err) console.log(err);
//             });
//           }
//           res.redirect('/register/fin');
//       });
//     }
// });

exports.register = router;
