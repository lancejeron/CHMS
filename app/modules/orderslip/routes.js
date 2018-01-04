var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function finvoice(req, res, next){
  var db = require('../../lib/database')();
  var sql1 = "SELECT tbluser.strSNum AS Buyer, tbluser.strName AS BName, tbluser.strEmail AS BEmail, C.strSNum AS Seller, C.strName AS SName, C.strEmail AS SEmail, strItemTitle, strCatName, fltItemPrice, intTransID, datDateStarted, strTransStatus FROM(SELECT * FROM (SELECT * FROM(";
  var sql2 = "SELECT * FROM tblitem INNER JOIN tbltransaction ON intItemID= intTransItemID )AS A INNER JOIN tblcategories ON intItemCat= intCatID )AS B INNER JOIN tbluser ON strItemSNum= strSNum)AS C INNER JOIN tbluser ON strBuyerSNum= tbluser.strSNum WHERE intTransID= ?";
  var sql = sql1.concat(sql2);
  db.query(sql,[req.params.transid], (err, results, fields) => {
      if (err) console.log(err);
      if (!results[0])
        console.log('');
      else{
        for(count=0;count<results.length;count++){
          results[count].date= results[count].datDateStarted.toDateString("en-US").slice(4, 15);
          results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
        }
      }
      console.log(results);
      req.invoice = results;
      return next();
    });
}

function render(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if(!req.invoice[0])
      res.render('login/views/noroute');
    else if(req.session.user == req.invoice[0].Seller || req.session.user == req.invoice[0].Buyer ){
      if(req.invoice[0].strTransStatus == 'Finished' || !req.invoice[0].strTransStatus)
        res.render('categ/views/invalidpages/itemunavailable');
      else
        res.render('orderslip/views/index',{ invoicetab: req.invoice });
    }
    else
      res.render('profile/views/invalidpages/unauthorized');
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}

router.get('/:transid', flog, finvoice, render);

exports.orderslip= router;
