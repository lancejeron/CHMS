var express = require('express');
var flog = require( '../home/loggedin');
var router = express.Router();

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function fregcount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'verified' OR strStatus= 'not verified'", function (err, results, fields) {
      if (err) return res.send(err);
      req.regcount = results;
      return next();
  });
}
function fvercount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'verified'", function (err, results, fields) {
      if (err) return res.send(err);
      req.vercount = results;
      return next();
  });
}
function fnvercount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'not verified'", function (err, results, fields) {
      if (err) return res.send(err);
      req.nvercount = results;
      return next();
  });
}
function funregcount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'unregistered'", function (err, results, fields) {
      if (err) return res.send(err);
      req.unregcount = results;
      return next();
  });
}
function frejcount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'rejected'", function (err, results, fields) {
      if (err) return res.send(err);
      req.rejcount = results;
      return next();
  });
}
function fbancount(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strSNum) AS CNT FROM dbpsm.tbluser WHERE strStatus= 'banned'", function (err, results, fields) {
      if (err) return res.send(err);
      req.bancount = results;
      return next();
  });
}

function fstudunreg(req, res, next){
  var db = require('../../lib/database')();
  var sql = "SELECT * FROM tbluser INNER JOIN (SELECT tblanswers.strAnswerSNum AS StudentNumber, SUM(tblchoices.boolCorrect) AS TotalScore FROM tblanswers INNER JOIN tblchoices ON tblchoices.intCHID=tblanswers.intAnswer GROUP BY tblanswers.strAnswerSNum) AS A ON strSNum=StudentNumber WHERE strStatus= 'unregistered'";
  db.query(sql, function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [], status = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
        status[0] = results[results.length-1].strStatus;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.status = status;
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.stud = results;
      return next();
  });
}
function fstudreject(req, res, next){
  var db = require('../../lib/database')();
  var sql = "SELECT * FROM tbluser INNER JOIN (SELECT tblanswers.strAnswerSNum AS StudentNumber, SUM(tblchoices.boolCorrect) AS TotalScore FROM tblanswers INNER JOIN tblchoices ON tblchoices.intCHID=tblanswers.intAnswer GROUP BY tblanswers.strAnswerSNum) AS A ON strSNum=StudentNumber WHERE strStatus= 'rejected'";
  db.query(sql, function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [], status = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
        status[0] = results[results.length-1].strStatus;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.status = status;
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.stud = results;
      return next();
  });
}
function freguser(req, res, next){
  var db = require('../../lib/database')();
  var sql = "SELECT * FROM tbluser INNER JOIN (SELECT tblanswers.strAnswerSNum AS StudentNumber, SUM(tblchoices.boolCorrect) AS TotalScore FROM tblanswers INNER JOIN tblchoices ON tblchoices.intCHID=tblanswers.intAnswer GROUP BY tblanswers.strAnswerSNum) AS A ON strSNum=StudentNumber WHERE strSNum= ?";
  db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      req.reguser = results;
      return next();
  });
}
function fverified(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strStatus= 'verified' ORDER BY intReport DESC", function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [], status = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
        status[0] = results[results.length-1].strStatus;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.status = status;
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.stud = results;
      return next();
  });
}
function fnotverified(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strStatus= 'not verified' ORDER BY intReport DESC", function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [], status = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
        status[0] = results[results.length-1].strStatus;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.status = status;
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.stud = results;
      return next();
  });
}
function fbanned(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strStatus= 'banned' ORDER BY intReport", function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [], status = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
        status[0] = results[results.length-1].strStatus;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.status = status;
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.stud = results;
      return next();
  });
}
function fpostreport(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, COUNT(*) AS CNT FROM(SELECT * FROM(SELECT * FROM(SELECT * FROM tblitem INNER JOIN tblreport ON intItemID= intReportItemID)AS A INNER JOIN tblcategories ON intItemCat= intCatID)AS B INNER JOIN tbluser ON strItemSNum= strSNum)AS C LEFT JOIN tbltransaction ON intItemID= intTransItemID WHERE strTransStatus!= 'Finished' OR strTransStatus IS NULL GROUP BY intItemID ORDER BY CNT DESC", function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].date= results[count].datPostDate.toDateString("en-US").slice(4, 15);
          results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.post = results;
      return next();
  });
}
function freportlog(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM(SELECT * FROM(SELECT * FROM(SELECT * FROM tblreport INNER JOIN tblitem ON intItemID= intReportItemID)A INNER JOIN tbluser ON strReportSNum= strSNum)B INNER JOIN tblcategories ON intItemCat= intCatID)C LEFT JOIN tbltransaction ON intTransItemID= intItemID WHERE strTransStatus!= 'Finished' OR strTransStatus IS NULL ORDER BY intReportID DESC", function (err, results, fields) {
      if (err) return res.send(err);
      var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].page = page;
          results[count].curpage = req.params.page;
          if((count+1)%5==0){
            page+=1;
          }
        }
        lastpage[0] = results[results.length-1].page;
      }
      if(req.params.page > 5){
        pagearr[0] = req.params.page - 5;
      }
      for(count=1;count<10;count++){
        pagearr[count] = pagearr[count-1] + 1;
      }
      req.lastpage = lastpage;
      req.curpage = curpage;
      req.prevpage = prevpage;
      req.nextpage = nextpage;
      req.page = pagearr;
      req.log = results;
      return next();
  });
}
function fremove(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblitem INNER JOIN tbltransaction ON intItemID= intTransItemID WHERE intItemID= ?",[req.params.postid], function (err, results, fields) {
      if (err) return res.send(err);
      req.remove = results;
      return next();
  });
}
function ftranscheck(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblitem INNER JOIN tbltransaction ON intItemID= intTransItemID WHERE strItemSNum= ?",[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      req.trans = results;
      return next();
  });
}

function render(req,res){
  if(req.valid==2)
    res.render('admin/views/index',{usertab: req.user, regtab: req.regcount, vertab: req.vercount, nvertab: req.nvercount, unregtab: req.unregcount, rejtab: req.rejcount, bantab: req.bancount});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function studunregrender(req,res){
  if(req.valid==2){
    if(!req.stud[0]){
      if(req.params.page == 1)
        res.render('admin/views/noaccountsunreg');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/registrations',{studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function studrejrender(req,res){
  if(req.valid==2){
    if(!req.stud[0]){
      if(req.params.page == 1)
        res.render('admin/views/noaccountsrej');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/registrations',{studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function approverender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    if(req.reguser[0].TotalScore >= 7)
      var sql = "UPDATE tbluser SET strStatus= 'verified' WHERE strSNum= ?";
    else
      var sql = "UPDATE tbluser SET strStatus= 'not verified' WHERE strSNum= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/admin/registration-unregistered/1');
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function rejectrender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    var sql = "UPDATE tbluser SET strStatus= 'rejected' WHERE strSNum= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/admin/registration-unregistered/1');
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function revertrender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    var sql = "UPDATE tbluser SET strStatus= 'unregistered' WHERE strSNum= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/admin/registration-rejected/1');
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function verifiedrender(req,res){
  if(req.valid==2){
    if(!req.stud[0]){
      if(req.params.page == 1)
        res.render('admin/views/noaccountsverified');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/accounts',{studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function notverifiedrender(req,res){
  if(req.valid==2){
    if(!req.stud[0]){
      if(req.params.page == 1)
        res.render('admin/views/noaccountsnotverified');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/accounts',{studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function bannedrender(req,res){
  if(req.valid==2){
    if(!req.stud[0]){
      if(req.params.page == 1)
        res.render('admin/views/noaccountsbanned');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/accounts',{studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function banverrender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    var sqlban = "UPDATE tbluser SET strStatus= 'banned' WHERE strSNum= ?";
    var sqlfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'Finished', datDateFinished= (SELECT CURDATE() AS CD) WHERE (strBuyerSNum= ? AND strTransStatus= 'SFinished') OR (strItemSNum= ? AND strTransStatus= 'BFinished')";
    var sqlbfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'BFinished' WHERE strBuyerSNum= ? AND strTransStatus= 'Ongoing'";
    var sqlsfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'SFinished' WHERE strItemSNum= ? AND strTransStatus= 'Ongoing'";
    var sqlrep = "DELETE rep FROM tblreport rep INNER JOIN tblitem item ON intReportItemID= intItemID WHERE strItemSNum= ?"
    var sqldel = "DELETE item FROM tblitem item LEFT JOIN tbltransaction trans ON intItemID= intTransItemID  WHERE strItemSNum= ? AND intTransID IS NULL";
    db.query(sqlban,[req.params.userid], function (err, results, fields) {
      if (err) console.log(err);
      db.query(sqlfin,[req.params.userid, req.params.userid], function (err, results, fields) {
        if (err) console.log(err);
        db.query(sqlbfin,[req.params.userid], function (err, results, fields) {
          if (err) console.log(err);
          db.query(sqlsfin,[req.params.userid], function (err, results, fields) {
            if (err) console.log(err);
            if(!req.trans[0]){
              db.query(sqlrep,[req.params.userid], function (err, results, fields) {
                if (err) console.log(err);
                db.query(sqldel,[req.params.userid], function (err, results, fields) {
                  if (err) console.log(err);
                  res.redirect('/admin/account-verified/1');
                });
              });
            }
            else{
              res.redirect('/admin/account-verified/1');
            }
          });
        });
      });
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function bannotverrender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    var sqlban = "UPDATE tbluser SET strStatus= 'banned' WHERE strSNum= ?";
    var sqlfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'Finished', datDateFinished= (SELECT CURDATE() AS CD) WHERE (strBuyerSNum= ? AND strTransStatus= 'SFinished') OR (strItemSNum= ? AND strTransStatus= 'BFinished')";
    var sqlbfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'BFinished' WHERE strBuyerSNum= ? AND strTransStatus= 'Ongoing'";
    var sqlsfin = "UPDATE tbltransaction INNER JOIN tblitem ON intTransItemID= intItemID SET strTransStatus= 'SFinished' WHERE strItemSNum= ? AND strTransStatus= 'Ongoing'";
    var sqlrep = "DELETE rep FROM tblreport rep INNER JOIN tblitem item ON intReportItemID= intItemID WHERE strItemSNum= ?"
    var sqldel = "DELETE item FROM tblitem item LEFT JOIN tbltransaction trans ON intItemID= intTransItemID  WHERE strItemSNum= ? AND intTransID IS NULL";
    db.query(sqlban,[req.params.userid], function (err, results, fields) {
      if (err) console.log(err);
      db.query(sqlfin,[req.params.userid, req.params.userid], function (err, results, fields) {
        if (err) console.log(err);
        db.query(sqlbfin,[req.params.userid], function (err, results, fields) {
          if (err) console.log(err);
          db.query(sqlsfin,[req.params.userid], function (err, results, fields) {
            if (err) console.log(err);
            if(!req.trans[0]){
              db.query(sqlrep,[req.params.userid], function (err, results, fields) {
                if (err) console.log(err);
                db.query(sqldel,[req.params.userid], function (err, results, fields) {
                  if (err) console.log(err);
                  res.redirect('/admin/account-notverified/1');
                });
              });
            }
            else{
              res.redirect('/admin/account-notverified/1');
            }
          });
        });
      });
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function reinstaterender(req,res){
  if(req.valid==2){
    var db = require('../../lib/database')();
    if(req.reguser[0].TotalScore >= 7)
      var sql = "UPDATE tbluser SET strStatus= 'verified' WHERE strSNum= ?";
    else
      var sql = "UPDATE tbluser SET strStatus= 'not verified' WHERE strSNum= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/admin/account-banned/1');
    });
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function postreportrender(req,res){
  if(req.valid==2){
    if(!req.post[0]){
      if(req.params.page == 1)
        res.render('admin/views/nopostsreported');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/postreported',{posttab: req.post, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function postreplogrender(req,res){
  if(req.valid==2){
    if(!req.log[0]){
      if(req.params.page == 1)
        res.render('admin/views/nopostreportlogged');
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('admin/views/postreportlog',{logtab: req.log, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function removepostrender(req,res){
  if(req.valid==2){
    if(!req.remove[0]){
      var db = require('../../lib/database')();
      db.query("DELETE FROM tblreport WHERE intReportItemID= ?",[req.params.postid], (err, results, fields) => {
        if (err) console.log(err);
        db.query("DELETE FROM tblitem WHERE intItemID= ?",[req.params.postid], (err, results, fields) => {
          if (err) console.log(err);
          res.redirect('/admin/post-reported/1');
        });
      });
    }
    else if(req.remove[0].strTransStatus == 'Finished'){
      res.render('categ/views/invalidpages/itemunavailable');
    }
    else{
      res.render('admin/views/invalidpages/removeunavailable');
    }
  }
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

router.get('/', flog, fregcount, fvercount, fnvercount, funregcount, frejcount, fbancount, render);
router.get('/registration-unregistered/:page', flog, fstudunreg, studunregrender);
router.get('/registration-rejected/:page', flog, fstudreject, studrejrender);
router.get('/registration/approve/:userid', flog, freguser, approverender);
router.get('/registration/reject/:userid', flog, rejectrender);
router.get('/registration/revert/:userid', flog, revertrender);
router.get('/account-verified/:page', flog, fverified, verifiedrender);
router.get('/account-notverified/:page', flog, fnotverified, notverifiedrender);
router.get('/account-banned/:page', flog, fbanned, bannedrender);
router.get('/account/banver/:userid', flog, ftranscheck, banverrender);
router.get('/account/bannotver/:userid', flog, ftranscheck, bannotverrender);
router.get('/account/reinstate/:userid', flog, freguser, reinstaterender);
router.get('/post-reported/:page', flog, fpostreport, postreportrender);
router.get('/post-reportlog/:page', flog, freportlog, postreplogrender);
router.get('/post/remove/:postid', flog, fremove, removepostrender);

exports.admin= router;
