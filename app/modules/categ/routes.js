var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function fcat(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblcategories", (err, results, fields) => {
      if (err) console.log(err);
      req.cat= results;
      return next();
    });
}
function fcatname(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT strCatName FROM tblcategories WHERE strCatName= ?",[req.params.catname], function (err, results, fields) {
      if (err) return res.send(err);
      req.catname = results;
      return next();
  });
}
function fitem(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM (SELECT * FROM (SELECT * FROM tblitem INNER JOIN tblcategories ON intItemCat= intCatID WHERE strCatName= ? ) AS ITEM INNER JOIN tbluser ON strItemSNum= strSNum) AS SELL LEFT JOIN tbltransaction ON intItemID= intTransItemID WHERE strTransStatus IS NULL ORDER BY intItemID DESC",[req.params.catname], function (err, results, fields) {
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
      req.item = results;
      return next();
  });
}
function fpost(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM (SELECT * FROM tblitem INNER JOIN tblcategories ON intItemCat= intCatID WHERE strCatName = ? AND intItemID = ? ) AS T INNER JOIN tbluser ON strItemSNum= strSNum ",[ req.params.catname, req.params.postid], (err, results, fields) => {
      if (err) console.log(err);
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].date= results[count].datPostDate.toDateString("en-US").slice(4, 15);
          results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
        }
      }
      req.post = results;
      return next();
    });
}
function ftrans(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbltransaction WHERE intTransItemID = ? AND strTransStatus IS NOT NULL",[req.params.postid], (err, results, fields) => {
  if (err) console.log(err);
      req.trans = results;
      return next();
    });
}
function freport(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblreport WHERE strReportSNum= ? AND intReportItemID= ?",[req.session.user, req.params.postid], (err, results, fields) => {
      if (err) console.log(err);
      req.report = results;
      return next();
    });
}
function fviewreport(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblitem INNER JOIN tblreport ON intItemID= intReportItemID WHERE strReportSNum= ? AND intItemID= ?",[req.session.user, req.params.postid], (err, results, fields) => {
      if (err) console.log(err);
      console.log(results);
      req.vreport = results;
      return next();
    });
}

function render(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1)
    res.render('categ/views/index', { cattab: req.cat });
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function catrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.catname[0])
      res.render('categ/views/invalidpages/nocateg');
    else if(!req.item[0]){
      if(req.params.page == 1)
        res.render('categ/views/noposts', {catnametab: req.catname});
      else
        res.render('login/views/noroute');
    }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
      res.render('login/views/noroute');
    else
      res.render('categ/views/catposts', {catnametab: req.catname, itemtab: req.item, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function postrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.post[0])
      res.render('categ/views/invalidpages/itemunavailable');
    else if(req.post[0].strItemSNum == req.session.user && !req.trans[0] )
      res.render('categ/views/ownpost',{ posttab: req.post });
    else if(!req.trans[0]){
      if(!req.vreport[0])
        req.post[0].button = 'noreport';
      else
        req.post[0].button = 'reported';
      res.render('categ/views/post',{ posttab: req.post });
    }
    else if(req.trans[0].strTransStatus == 'Ongoing' || req.trans[0].strTransStatus == 'SFinished' || req.trans[0].strTransStatus == 'BFinished')
      res.render('categ/views/viewpost',{ posttab: req.post });
    else
      res.render('categ/views/invalidpages/itemunavailable');
  }
  else if(req.valid==2){
    if(!req.post[0])
      res.render('categ/views/invalidpages/itemunavailable');
    else if(!req.trans[0]){
      res.render('categ/views/adminviewpost',{ posttab: req.post });
    }
    else if(req.trans[0].strTransStatus == 'Ongoing' || req.trans[0].strTransStatus == 'SFinished' || req.trans[0].strTransStatus == 'BFinished')
      res.render('categ/views/admintranspost',{ posttab: req.post });
    else
      res.render('categ/views/invalidpages/itemunavailable');
  }
  else
    res.render('login/views/invalid');
}
function orderrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.post[0])
      res.render('categ/views/invalidpages/orderunavailable');
    else if(req.post[0].strItemSNum == req.session.user)
      res.render('categ/views/invalidpages/selforder');
    else if(!req.trans[0])
      res.render('categ/views/order',{ posttab: req.post });
    else if(req.trans[0].strTransStatus == 'Ongoing' || req.trans[0].strTransStatus == 'SFinished' || req.trans[0].strTransStatus == 'BFinished' )
      res.render('categ/views/invalidpages/orderunavailable');
    else
      res.render('categ/views/invalidpages/itemunavailable');
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function reportrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.post[0])
      res.render('categ/views/invalidpages/itemunavailable');
    else if(!req.trans[0]){
      if(req.session.user == req.post[0].strItemSNum)
        res.render('profile/views/invalidpages/unauthorized');
      else if(!req.report[0]){
        var db = require('../../lib/database')();
        db.query("INSERT INTO tblreport (intReportItemID, strReportSNum) VALUES (?,?)",[req.params.postid, req.session.user], (err, results, fields) => {
          if (err) console.log(err);
          res.redirect('/home/page/1');
        });
      }
      else
        res.render('categ/views/invalidpages/reportunavailable');
    }
    else if(req.trans[0].strTransStatus == 'Ongoing' || req.trans[0].strTransStatus == 'SFinished' || req.trans[0].strTransStatus == 'BFinished' )
      res.render('profile/views/invalidpages/unauthorized');
    else if(req.trans[0].strTransStatus == 'Finished')
      res.render('categ/views/invalidpages/itemunavailable');
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function cancelreportrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.post[0])
      res.render('categ/views/invalidpages/itemunavailable');
    else if(req.session.user == req.post[0].strItemSNum)
      res.render('profile/views/invalidpages/unauthorized');
    else if(!req.report[0])
      res.render('categ/views/invalidpages/notreported');
    else if(!req.trans[0]){
      var db = require('../../lib/database')();
      db.query("DELETE FROM tblreport WHERE intReportItemID= ? AND strReportSNum= ?",[req.params.postid, req.session.user], (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/home/page/1');
      });
    }
    else if(req.trans[0].strTransStatus == 'Ongoing' || req.trans[0].strTransStatus == 'SFinished' || req.trans[0].strTransStatus == 'BFinished' )
      res.render('profile/views/invalidpages/unauthorized');
    else if(req.trans[0].strTransStatus == 'Finished')
      res.render('categ/views/invalidpages/itemunavailable');
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}

router.get('/', flog, fcat, render);
router.get('/:catname/page/:page', flog, fcatname, fitem, catrender);
router.get('/:catname/:postid', flog, fpost, ftrans, fviewreport, postrender);
router.get('/:catname/:postid/order', flog, fpost, ftrans, orderrender);
router.get('/:catname/:postid/report', flog, fpost, freport, ftrans, reportrender);
router.get('/:catname/:postid/cancelreport', flog, fpost, freport, ftrans, cancelreportrender);

router.post('/:catname/:postid/order', flog, fpost, ftrans, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else{
    var db = require('../../lib/database')();
    if( req.body.orderpass == ''){
      res.render('categ/views/invalidpages/orderblank',{ posttab: req.post });
    }
    else if (!req.trans[0]){
      db.query("SELECT strOrderPass FROM tblitem WHERE intItemID= ?",[req.params.postid], (err, results, fields) => {
          if (err) console.log(err);
          if(req.body.orderpass === results[0].strOrderPass ){
            db.query("INSERT INTO tbltransaction ( intTransItemID, strBuyerSNum, datDateStarted, strTransStatus ) VALUES ( ?, ?, (SELECT curdate() AS CD) , 'Ongoing' )",[req.params.postid, req.session.user], (err, results, fields) => {
              if (err) console.log(err);
              db.query("SELECT * FROM tblitem INNER JOIN tbltransaction ON intItemID= intTransItemID WHERE intItemID= ? AND strTransStatus!= 'Finished'",[req.params.postid], (err, results, fields) => {
                  if (err) console.log(err);
                  console.log(results);
                  res.render('categ/views/ordersuccess',{ posttab: req.post , transposttab: results});
                });
            });
          }
          else{
            res.render('categ/views/invalidpages/orderincorrect',{ posttab: req.post });
          }
      });
    }
    else{
      res.render('categ/views/invalidpages/alreadyordered');
    }
  }
});

exports.categories= router;
