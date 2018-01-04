var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var db = require('../../lib/database')();
    req.session.user = '';
    res.render('login/views/index');
});

router.post('/', (req, res) => {
  var db = require('../../lib/database')();
  if(req.body.email === "" || req.body.password === ""){
    res.render('login/views/invalidpages/blank');
  }
  else{
    db.query("SELECT * FROM tbluser WHERE strEmail= ? ",[req.body.email], (err, results, fields) => {
        if (err) console.log(err);
        if (!results[0]){
          res.render('login/views/invalidpages/incorrect');
        }
        else if ( results[0].strStatus == 'unregistered' || results[0].strStatus == 'rejected'){
          res.render('login/views/invalidpages/unreg');
        }
        else if ( results[0].strStatus == 'banned'){
          res.render('login/views/invalidpages/banned');
        }
        else if(req.body.password === results[0].strPassword){
          req.session.user = results[0].intID;
          if(results[0].strStatus != 'admin')
            res.redirect('/home/page/1');
          else
            res.redirect('/admin');
        }
        else{
            res.render('login/views/invalidpages/incorrect');
        }
      });
    }
  });
  
  exports.login = router;
  
  // else{
  //   db.query("SELECT * FROM tbluser WHERE strSNum= ? ",[req.body.studnum], (err, results, fields) => {
  //       if (err) console.log(err);
  //       if (!results[0]){
  //         res.render('login/views/invalidpages/incorrect');
  //       }
  //       else if ( results[0].strStatus == 'unregistered' || results[0].strStatus == 'rejected'){
  //         res.render('login/views/invalidpages/unreg');
  //       }
  //       else if ( results[0].strStatus == 'banned'){
  //         res.render('login/views/invalidpages/banned');
  //       }
  //       else if(req.body.password === results[0].strPassword){
  //         req.session.user = results[0].strSNum;
  //         if(results[0].strStatus != 'admin')
  //           res.redirect('/home/page/1');
  //         else
  //           res.redirect('/admin');
  //       }
  //       else{
  //           res.render('login/views/invalidpages/incorrect');
  //       }