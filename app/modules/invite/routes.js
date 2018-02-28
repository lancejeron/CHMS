var express =require('express');
var router =express.Router();
var flog=require('../home/loggedin')

function findmyuser(req,res,next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tbluser WHERE intID= ?",[req.params.userid], (err, results, fields) => {
        if (err) console.log(err);
        req.user= results;

      });
        var db = require('../../lib/database')();
        db.query("SELECT * FROM tblcoffeeshop", (err, results, fields) => {
            if (err) console.log(err);
            req.coffeeshop= results;
            return next();
          });
  }

function rendermyuser(req,res){
    if(req.valid==3){
      res.render('login/views/invalidpages/banned');
    }
    else if(req.valid==1){
      if (!req.user[0])
        res.render('login/views/noroute');
      else if(req.user[0].intID == req.session.user)
        res.render('login/views/noroute');
      else
        res.render('invite/views/index',{usertab: req.user, coffeeshoptab: req.coffeeshop});
    }
    else if(req.valid==2)
      res.render('home/views/invalidpages/adminonly');
    else
      res.render('login/views/noroute');
  }
  router.get('/:userid',flog,findmyuser,rendermyuser);

function invite(req,res,next){
    
      var db = require('../../lib/database')();
      db.query(`INSERT INTO tbltransaction (intTransID_intID, strTransDetails, intTransID_intCID, datDateTrans, timTimeTrans, intTransID_intID2, strTransStatus)  VALUES ("${req.session.user}","${req.body.invdetails}","${req.body.invcoffeeshop}","${req.body.invdate}","${req.body.invtime}","${req.params.userid}","pending")`, (err, results, fields) => {
          if (err) console.log(err);
          res.redirect('/home/page/1');
      });

   
  }
router.post('/inviterequest/:userid',flog,invite);

exports.invite=router;

