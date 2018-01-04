var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');
var fs = require('fs');

// router.get('/', (req, res) => {
//   var db = require('../../lib/database')();
//   req.session.user = '';
//   res.render('profile/views/index');
// });


// function numberWithCommas(x) {
//     var parts = x.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
// }
// function makeid() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < 50; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   return text;
// }

function fuser(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE intID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.user= results;
      return next();
    });
}
// function fedituser(req,res,next){
//   var db = require('../../lib/database')();
//   db.query("SELECT * FROM tbluser WHERE strSNum= ?",[req.session.user], (err, results, fields) => {
//       if (err) console.log(err);
//       req.user= results;
//       return next();
//     });
// }
// function ftrans(req,res,next){
//   var db = require('../../lib/database')();
//   var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
//   var sqltrans1 = "SELECT B.*, strName FROM(SELECT * FROM (SELECT * FROM tbltransaction INNER JOIN tblitem ON intItemID= intTransItemID WHERE strItemSNum= ? OR strBuyerSNum= ?) AS TRANS INNER JOIN tblcategories ON intItemCat= intCatID WHERE strTransStatus='Ongoing') AS B INNER JOIN tbluser WHERE (strBuyerSNum = strSNum AND strSNum!= ?) OR (strItemSNum = strSNum AND strSNum!= ?) ORDER BY intTransID DESC";
//   db.query(sqltrans1,[req.session.user,req.session.user,req.session.user,req.session.user],(err, results, fields) => {
//       if (err) console.log(err);
//       if (!results[0])
//         console.log('');
//       else{
//         for(count=0;count<results.length;count++){
//           results[count].date= results[count].datDateStarted.toDateString("en-US").slice(4, 15);
//           results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
//           results[count].page = page;
//           results[count].curpage = req.params.page;
//           if((count+1)%5==0){
//             page+=1;
//           }
//         }
//         lastpage[0] = results[results.length-1].page;
//       }
//       if(req.params.page > 5){
//         pagearr[0] = req.params.page - 5;
//       }
//       for(count=1;count<10;count++){
//         pagearr[count] = pagearr[count-1] + 1;
//       }
//       req.lastpage = lastpage;
//       req.curpage = curpage;
//       req.prevpage = prevpage;
//       req.nextpage = nextpage;
//       req.page = pagearr;
//       req.trans= results;
//       return next();
//     });
// }
// function fholdtrans(req,res,next){
//   var db = require('../../lib/database')();
//   var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
//   var sqltrans2 = "SELECT B.*, strName, strStatus FROM(SELECT * FROM (SELECT * FROM tbltransaction INNER JOIN tblitem ON intItemID= intTransItemID WHERE strItemSNum= ? OR strBuyerSNum= ?) AS TRANS INNER JOIN tblcategories ON intItemCat= intCatID WHERE strTransStatus!='Ongoing' AND strTransStatus!='Finished') AS B INNER JOIN tbluser WHERE (strBuyerSNum = strSNum AND strSNum!= ?) OR (strItemSNum = strSNum AND strSNum!= ?) ORDER BY intTransID DESC";
//   db.query(sqltrans2,[req.session.user,req.session.user,req.session.user,req.session.user],(err, results, fields) => {
//       if (err) console.log(err);
//       if (!results[0])
//         console.log('');
//       else{
//         for(count=0;count<results.length;count++){
//           results[count].date= results[count].datDateStarted.toDateString("en-US").slice(4, 15);
//           results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
//           results[count].page = page;
//           results[count].curpage = req.params.page;
//           if((count+1)%5==0){
//             page+=1;
//           }
//         }
//         lastpage[0] = results[results.length-1].page;
//       }
//       if(req.params.page > 5){
//         pagearr[0] = req.params.page - 5;
//       }
//       for(count=1;count<10;count++){
//         pagearr[count] = pagearr[count-1] + 1;
//       }
//       req.lastpage = lastpage;
//       req.curpage = curpage;
//       req.prevpage = prevpage;
//       req.nextpage = nextpage;
//       req.page = pagearr;
//       req.hold= results;
//       return next();
//     });
// }
// function ftranshistory(req,res,next){
//   var db = require('../../lib/database')();
//   var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
//   var sqltrans4 = "SELECT B.*, strName FROM(SELECT * FROM (SELECT * FROM tbltransaction INNER JOIN tblitem ON intItemID= intTransItemID WHERE strItemSNum= ? OR strBuyerSNum= ?) AS TRANS INNER JOIN tblcategories ON intItemCat= intCatID WHERE strTransStatus='Finished') AS B INNER JOIN tbluser WHERE (strBuyerSNum = strSNum AND strSNum!= ?) OR (strItemSNum = strSNum AND strSNum!= ?) ORDER BY intTransID DESC";
//   db.query(sqltrans4,[req.session.user,req.session.user,req.session.user,req.session.user],(err, results, fields) => {
//       if (err) console.log(err);
//       if (!results[0])
//         console.log('');
//       else{
//         for(count=0;count<results.length;count++){
//           results[count].date= results[count].datDateStarted.toDateString("en-US").slice(4, 15);
//           results[count].fin= results[count].datDateFinished.toDateString("en-US").slice(4, 15);
//           results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
//           results[count].page = page;
//           results[count].curpage = req.params.page;
//           if((count+1)%5==0){
//             page+=1;
//           }
//         }
//         lastpage[0] = results[results.length-1].page;
//       }
//       if(req.params.page > 5){
//         pagearr[0] = req.params.page - 5;
//       }
//       for(count=1;count<10;count++){
//         pagearr[count] = pagearr[count-1] + 1;
//       }
//       req.lastpage = lastpage;
//       req.curpage = curpage;
//       req.prevpage = prevpage;
//       req.nextpage = nextpage;
//       req.page = pagearr;
//       req.history= results;
//       return next();
//     });
// }
// function ftransfin(req, res, next){
//   var db = require('../../lib/database')();
//   var sqltrans3 = "SELECT B.*, strName FROM(SELECT * FROM (SELECT * FROM tbltransaction INNER JOIN tblitem ON intItemID= intTransItemID WHERE strItemSNum= ? OR strBuyerSNum= ?) AS TRANS INNER JOIN tblcategories ON intItemCat= intCatID WHERE strTransStatus!= 'Finished') AS B INNER JOIN tbluser WHERE ((strBuyerSNum = strSNum AND strSNum!= ?) OR (strItemSNum = strSNum AND strSNum!= ?)) AND intTransID= ? ORDER BY intTransID DESC";
//   db.query(sqltrans3,[req.session.user,req.session.user,req.session.user,req.session.user,req.params.transid], (err, results, fields) => {
//       if (err) console.log(err);
//       console.log('TRANSFIN: '+ results);
//       req.transfin= results;
//       return next();
//   });
// }
// function ftransid(req, res, next){
//   var db = require('../../lib/database')();
//   db.query("SELECT * FROM tbltransaction WHERE intTransID= ?",[req.params.transid], (err, results, fields) => {
//       if (err) console.log(err);
//       req.transid= results;
//       return next();
//   });
// }
// function fmypost(req, res, next){
//   var db = require('../../lib/database')();
//   db.query("SELECT B.*, strTransStatus FROM(SELECT * FROM(SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) A INNER JOIN tblcategories ON intItemCat= intCatID) B LEFT JOIN tbltransaction ON intTransItemID= intItemID WHERE strTransStatus IS NULL ORDER BY intItemID DESC",[req.params.userid], (err, results, fields) => {
//       if (err) console.log(err);
//       var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
//       if (!results[0])
//         console.log('');
//       else{
//         for(count=0;count<results.length;count++){
//           results[count].date= results[count].datPostDate.toDateString("en-US").slice(4, 15);
//           results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
//           results[count].page = page;
//           results[count].curpage = req.params.page;
//           if((count+1)%5==0){
//             page+=1;
//           }
//         }
//         lastpage[0] = results[results.length-1].page;
//       }
//       if(req.params.page > 5){
//         pagearr[0] = req.params.page - 5;
//       }
//       for(count=1;count<10;count++){
//         pagearr[count] = pagearr[count-1] + 1;
//       }
//       req.lastpage = lastpage;
//       req.curpage = curpage;
//       req.prevpage = prevpage;
//       req.nextpage = nextpage;
//       req.page = pagearr;
//       req.mypost = results;
//       return next();
//     });
// }
// function feditpost(req, res, next){
//   var db = require('../../lib/database')();
//   db.query("SELECT B.*, strTransStatus FROM(SELECT * FROM(SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) A INNER JOIN tblcategories ON intItemCat= intCatID) B LEFT JOIN tbltransaction ON intTransItemID= intItemID WHERE strTransStatus IS NULL AND intItemID= ? ORDER BY intItemID DESC",[req.params.userid, req.params.postid], (err, results, fields) => {
//       if (err) console.log(err);
//       if (!results[0]){
//         console.log('');
//       }
//       else{
//         results[0].date= results[0].datPostDate.toDateString("en-US").slice(4, 15);
//         results[0].price = numberWithCommas(results[0].fltItemPrice);
//       }
//       req.editpost = results;
//       return next();
//     });
// }

function profilerender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if (!req.user[0])
      res.render('login/views/noroute');
    else if(req.user[0].intID == req.session.user)
      res.render('profile/views/index',{usertab: req.user, transtab: req.trans});
      // ,{usertab: req.user, transtab: req.trans}
    else
      res.render('profile/views/otherprofile',{usertab: req.user, transtab: req.trans});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
// function editprofilerender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1)
//     res.render('profile/views/editprofile',{usertab: req.user});
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function transrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.trans[0]){
//       if(req.params.page == 1)
//         res.render('profile/views/noongoingtrans');
//       else
//         res.render('login/views/noroute');
//     }
//     else if(req.params.page < 1 || req.params.page > req.lastpage[0])
//       res.render('login/views/noroute');
//     else
//       res.render('profile/views/ongoingtrans',{transtab: req.trans, viewertab: req.user, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function transholdrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.hold[0]){
//       if(req.params.page == 1)
//         res.render('profile/views/noonholdtrans');
//       else
//         res.render('login/views/noroute');
//     }
//     else if(req.params.page < 1 || req.params.page > req.lastpage[0])
//       res.render('login/views/noroute');
//     else
//       res.render('profile/views/onholdtrans',{transtab: req.hold, viewertab: req.user, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function transhistrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.history[0]){
//       if(req.params.page == 1)
//         res.render('profile/views/noprevtrans');
//       else
//         res.render('login/views/noroute');
//     }
//     else if(req.params.page < 1 || req.params.page > req.lastpage[0])
//       res.render('login/views/noroute');
//     else
//       res.render('profile/views/previoustrans',{transtab: req.history, viewertab: req.user, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function transconfirmrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if (!req.transfin[0])
//       res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       var db = require('../../lib/database')();
//       if ( req.transid[0].strTransStatus=='Ongoing' ){
//         if (req.session.user == req.transfin[0].strItemSNum || req.session.user == req.transfin[0].strBuyerSNum){
//           res.render('profile/views/transconfirm',{transtab: req.transfin, usertab: req.user});
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//       else{
//         if (req.session.user == req.transfin[0].strItemSNum && req.transid[0].strTransStatus!= 'SFinished'){
//           res.render('profile/views/transconfirm',{transtab: req.transfin, usertab: req.user});
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum && req.transid[0].strTransStatus!= 'BFinished'){
//           res.render('profile/views/transconfirm',{transtab: req.transfin, usertab: req.user});
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function commendrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if (!req.transfin[0])
//       res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       var db = require('../../lib/database')();
//       if ( req.transid[0].strTransStatus=='Ongoing' ){
//         if (req.session.user == req.transfin[0].strItemSNum ){
//           db.query("SELECT intCommend FROM tbluser WHERE strSNum= ?",[req.transfin[0].strBuyerSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var commend = results[0].intCommend + 1;
//               db.query("UPDATE tbluser SET intCommend= ? WHERE strSNum= ?",[commend, req.transfin[0].strBuyerSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum){
//           db.query("SELECT intCommend FROM tbluser WHERE strSNum= ?",[req.transfin[0].strItemSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var commend = results[0].intCommend + 1;
//               db.query("UPDATE tbluser SET intCommend= ? WHERE strSNum= ?",[commend, req.transfin[0].strItemSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//       else{
//         if (req.session.user == req.transfin[0].strItemSNum && req.transid[0].strTransStatus!= 'SFinished'){
//           db.query("SELECT intCommend FROM tbluser WHERE strSNum= ?",[req.transfin[0].strBuyerSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var commend = results[0].intCommend + 1;
//               db.query("UPDATE tbluser SET intCommend= ? WHERE strSNum= ?",[commend, req.transfin[0].strBuyerSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum && req.transid[0].strTransStatus!= 'BFinished'){
//           db.query("SELECT intCommend FROM tbluser WHERE strSNum= ?",[req.transfin[0].strItemSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var commend = results[0].intCommend + 1;
//               db.query("UPDATE tbluser SET intCommend= ? WHERE strSNum= ?",[commend, req.transfin[0].strItemSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function reportrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if (!req.transfin[0])
//       res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       var db = require('../../lib/database')();
//       if ( req.transid[0].strTransStatus=='Ongoing' ){
//         if (req.session.user == req.transfin[0].strItemSNum ){
//           db.query("SELECT intReport FROM tbluser WHERE strSNum= ?",[req.transfin[0].strBuyerSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var report = results[0].intReport + 1;
//               db.query("UPDATE tbluser SET intReport= ? WHERE strSNum= ?",[report, req.transfin[0].strBuyerSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum){
//           db.query("SELECT intReport FROM tbluser WHERE strSNum= ?",[req.transfin[0].strItemSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var report = results[0].intReport + 1;
//               db.query("UPDATE tbluser SET intReport= ? WHERE strSNum= ?",[report, req.transfin[0].strItemSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//       else{
//         if (req.session.user == req.transfin[0].strItemSNum && req.transid[0].strTransStatus!= 'SFinished'){
//           db.query("SELECT intReport FROM tbluser WHERE strSNum= ?",[req.transfin[0].strBuyerSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var report = results[0].intReport + 1;
//               db.query("UPDATE tbluser SET intReport= ? WHERE strSNum= ?",[report, req.transfin[0].strBuyerSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum && req.transid[0].strTransStatus!= 'BFinished'){
//           db.query("SELECT intReport FROM tbluser WHERE strSNum= ?",[req.transfin[0].strItemSNum], (err, results, fields) => {
//               if (err) console.log(err);
//               var report = results[0].intReport + 1;
//               db.query("UPDATE tbluser SET intReport= ? WHERE strSNum= ?",[report, req.transfin[0].strItemSNum], (err, results, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/-/finishtrans/'+req.transid[0].intTransID);
//               });
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function transfinrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if (!req.transfin[0])
//       res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       var db = require('../../lib/database')();
//       if ( req.transid[0].strTransStatus=='Ongoing' ){
//         if (req.session.user == req.transfin[0].strItemSNum ){
//           db.query("UPDATE tbltransaction SET strTransStatus= 'SFinished' WHERE intTransID= ?",[req.params.transid], (err, results, fields) => {
//               if (err) console.log(err);
//               res.render('profile/views/transfin',{transtab: req.transfin, usertab: req.user});
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum){
//           db.query("UPDATE tbltransaction SET strTransStatus= 'BFinished' WHERE intTransID= ?",[req.params.transid], (err, results, fields) => {
//               if (err) console.log(err);
//               res.render('profile/views/transfin',{transtab: req.transfin, usertab: req.user});
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//       else{
//         if (req.session.user == req.transfin[0].strItemSNum && req.transid[0].strTransStatus!= 'SFinished'){
//           db.query("UPDATE tbltransaction SET strTransStatus= 'Finished', datDateFinished= (SELECT curdate() AS CD) WHERE intTransID= ?",[req.params.transid], (err, results, fields) => {
//               if (err) console.log(err);
//               res.render('profile/views/transfin',{transtab: req.transfin, usertab: req.user});
//           });
//         }
//         else if (req.session.user == req.transfin[0].strBuyerSNum && req.transid[0].strTransStatus!= 'BFinished'){
//           db.query("UPDATE tbltransaction SET strTransStatus= 'Finished', datDateFinished= (SELECT curdate() AS CD) WHERE intTransID= ?",[req.params.transid], (err, results, fields) => {
//               if (err) console.log(err);
//               res.render('profile/views/transfin',{transtab: req.transfin, usertab: req.user});
//           });
//         }
//         else
//           res.render('profile/views/invalidpages/unauthorized');
//       }
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function mypostrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.mypost[0]){
//       if(req.params.page == 1)
//         res.render('profile/views/noposts', { usertab: req.user} );
//       else
//         res.render('login/views/noroute');
//     }
//     else if(req.params.page < 1 || req.params.page > req.lastpage[0])
//       res.render('login/views/noroute');
//     else if(req.session.user == req.mypost[0].strSNum)
//       res.render('profile/views/myposts', { usertab: req.user, myposttab: req.mypost , pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
//     else
//       res.render('profile/views/otherposts', { usertab: req.user, myposttab: req.mypost , pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function editpostrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.editpost[0])
//         res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       if (req.session.user == req.editpost[0].strItemSNum)
//         res.render('profile/views/editpost', { editposttab: req.editpost });
//       else
//         res.render('profile/views/invalidpages/unauthorized');
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }
// function deletepostrender(req,res){
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else if(req.valid==1){
//     if(!req.editpost[0])
//         res.render('categ/views/invalidpages/itemunavailable');
//     else{
//       if (req.session.user == req.editpost[0].strItemSNum){
//         var db = require('../../lib/database')();
//         db.query("DELETE FROM tblreport WHERE intReportItemID= ?",[req.params.postid], (err, results, fields) => {
//           if (err) console.log(err);
//           db.query("DELETE FROM tblitem WHERE strItemSNum= ? AND intItemID= ?",[req.params.userid, req.params.postid], (err, results, fields) => {
//             if (err) console.log(err);
//             res.redirect('/profile/'+ req.params.userid +'/posts/1');
//           });
//         });
//       }
//       else
//         res.render('profile/views/invalidpages/unauthorized');
//     }
//   }
//   else if(req.valid==2)
//     res.render('home/views/invalidpages/adminonly');
//   else
//     res.render('login/views/invalid');
// }

// router.get('/', flog, (req, res) => {
//       res.redirect('/profile/'+req.session.user);

// });
router.get('/:userid', flog, fuser, profilerender);
// router.get('/-/edit', flog, fedituser, editprofilerender);
// router.get('/-/transactions/:page', flog, ftrans, fedituser, transrender);
// router.get('/-/transactions/hold/:page', flog, fholdtrans, fedituser, transholdrender);
// router.get('/-/transactions/history/:page', flog, ftranshistory, fedituser, transhistrender);
// router.get('/-/confirmtrans/:transid', flog, ftransfin, fedituser, ftransid, transconfirmrender);
// router.get('/-/commend/:transid', flog, ftransfin, ftransid, commendrender);
// router.get('/-/report/:transid', flog, ftransfin, ftransid, reportrender);
// router.get('/-/finishtrans/:transid', flog, ftransfin, fedituser, ftransid, transfinrender);
// router.get('/:userid/posts/:page', flog, fuser, fmypost, mypostrender);
// router.get('/:userid/posts/:postid/edit', flog, feditpost, editpostrender);
// router.get('/:userid/posts/:postid/delete', flog, feditpost, deletepostrender);

// router.post('/-/edit', flog, fedituser, (req, res) => {
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else{
//     var db = require('../../lib/database')();
//     if(req.body.studname=='' || req.body.oldpass=='' || req.body.newpass=='' || req.body.confirm=='' || req.body.email=='' ){
//       res.render('profile/views/invalidpages/blank',{usertab: req.user});
//     }
//     else if( req.body.newpass === req.body.confirm ){
//       if(req.body.oldpass === req.user[0].strPassword){
//         var randomId= makeid();
//         jpeg= req.session.user.concat('-'+randomId+'-dp.jpg');
//         if(!req.files.profilepic){
//           db.query("UPDATE tbluser SET strName= ?, strPassword= ?, strEmail= ?, txtContact= ? WHERE strSNum= ? ",[req.body.studname, req.body.newpass, req.body.email, req.body.contact, req.session.user], (err, results1, fields) => {
//               if (err) console.log(err);
//               res.redirect('/profile');
//           });
//         }
//         else{
//           req.files.profilepic.mv('public/images/profile_pictures/'+jpeg, function(err) {
//             db.query("UPDATE tbluser SET strName= ?, strPassword= ?, strEmail= ?, txtContact= ?, strProfilePicture= ? WHERE strSNum= ? ",[req.body.studname, req.body.newpass, req.body.email, req.body.contact, jpeg, req.session.user], (err, results1, fields) => {
//                 if (err) console.log(err);
//                 if(req.user[0].strProfilePicture!= 'blank.jpg')
//                   fs.unlink('public/images/profile_pictures/'+req.user[0].strProfilePicture);
//                 res.redirect('/profile');
//             });
//           });
//         }
//       }
//       else
//         res.render('profile/views/invalidpages/incorrect',{usertab: req.user});
//     }
//     else
//       res.render('profile/views/invalidpages/notmatch',{usertab: req.user});
//   }
// });
// router.post('/:userid/posts/:postid/edit', flog, feditpost, (req, res) => {
//   if(req.valid==3){
//     res.render('login/views/invalidpages/banned');
//   }
//   else{
//     var db = require('../../lib/database')();
//     if(req.body.title=='' || req.body.price=='' || req.body.oldpass=='' || req.body.newpass=='' || req.body.confirm=='' ){
//       res.render('profile/views/invalidpages/postblank',{editposttab: req.editpost});
//     }
//     else if( req.body.newpass === req.body.confirm ){
//       db.query("SELECT strOrderPass FROM tblitem WHERE intItemID= ? ",[req.params.postid], (err, results, fields) => {
//           if (err) console.log(err);
//           if(req.body.oldpass === results[0].strOrderPass){
//             var randomId= makeid();
//             jpeg1= req.session.user.concat('-'+randomId+'-1.jpg');
//             jpeg2= req.session.user.concat('-'+randomId+'-2.jpg');
//             jpeg3= req.session.user.concat('-'+randomId+'-3.jpg');
//             if(!req.files.pic1 && !req.files.pic2 && !req.files.pic3){
//               db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, req.body.category, req.params.postid], (err, results1, fields) => {
//                   if (err) console.log(err);
//                   res.redirect('/profile/'+req.session.user+'/posts/1');
//               });
//             }// none
//             else if(!req.files.pic2 && !req.files.pic3){
//               req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
//                 db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strFirstPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg1, req.body.category, req.params.postid], (err, results1, fields) => {
//                     if (err) console.log(err);
//                     if(req.editpost[0].strFirstPic!= 'blank.jpg')
//                       fs.unlink('public/images/uploaded_images/'+req.editpost[0].strFirstPic);
//                     res.redirect('/profile/'+req.session.user+'/posts/1');
//                 });
//               });
//             }// 1
//             else if(!req.files.pic1 && !req.files.pic3){
//               req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
//                 db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strSecondPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg2, req.body.category, req.params.postid], (err, results1, fields) => {
//                     if (err) console.log(err);
//                     if(req.editpost[0].strSecondPic!= 'blank.jpg')
//                       fs.unlink('public/images/uploaded_images/'+req.editpost[0].strSecondPic);
//                     res.redirect('/profile/'+req.session.user+'/posts/1');
//                 });
//               });
//             }// 2
//             else if(!req.files.pic1 && !req.files.pic2){
//               req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
//                 db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strThirdPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg3, req.body.category, req.params.postid], (err, results1, fields) => {
//                     if (err) console.log(err);
//                     if(req.editpost[0].strThirdPic!= 'blank.jpg')
//                       fs.unlink('public/images/uploaded_images/'+req.editpost[0].strThirdPic);
//                     res.redirect('/profile/'+req.session.user+'/posts/1');
//                 });
//               });
//             }// 3
//             else if(!req.files.pic3){
//               req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
//                 req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
//                   db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strFirstPic= ?, strSecondPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg1, jpeg2, req.body.category, req.params.postid], (err, results1, fields) => {
//                       if (err) console.log(err);
//                       if(req.editpost[0].strFirstPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strFirstPic);
//                       if(req.editpost[0].strSecondPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strSecondPic);
//                       res.redirect('/profile/'+req.session.user+'/posts/1');
//                   });
//                 });
//               });
//             }// 12
//             else if(!req.files.pic2){
//               req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
//                 req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
//                   db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strFirstPic= ?, strThirdPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg1, jpeg3, req.body.category, req.params.postid], (err, results1, fields) => {
//                       if (err) console.log(err);
//                       if(req.editpost[0].strFirstPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strFirstPic);
//                       if(req.editpost[0].strThirdPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strThirdPic);
//                       res.redirect('/profile/'+req.session.user+'/posts/1');
//                   });
//                 });
//               });
//             }// 13
//             else if(!req.files.pic1){
//               req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
//                 req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
//                   db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strSecondPic= ?, strThirdPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg2, jpeg3, req.body.category, req.params.postid], (err, results1, fields) => {
//                       if (err) console.log(err);
//                       if(req.editpost[0].strSecondPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strSecondPic);
//                       if(req.editpost[0].strThirdPic!= 'blank.jpg')
//                         fs.unlink('public/images/uploaded_images/'+req.editpost[0].strThirdPic);
//                       res.redirect('/profile/'+req.session.user+'/posts/1');
//                   });
//                 });
//               });
//             }// 23
//             else{
//               req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
//                 req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
//                   req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
//                     db.query("UPDATE tblitem SET strItemTitle = ?, fltItemPrice= ?, txtItemDesc= ?, strOrderPass= ?, strFirstPic= ?, strSecondPic= ?, strThirdPic= ?, intItemCat= ? WHERE intItemID= ? ",[req.body.title, req.body.price, req.body.description, req.body.newpass, jpeg1, jpeg2, jpeg3, req.body.category, req.params.postid], (err, results1, fields) => {
//                         if (err) console.log(err);
//                         if(req.editpost[0].strFirstPic!= 'blank.jpg')
//                           fs.unlink('public/images/uploaded_images/'+req.editpost[0].strFirstPic);
//                         if(req.editpost[0].strSecondPic!= 'blank.jpg')
//                           fs.unlink('public/images/uploaded_images/'+req.editpost[0].strSecondPic);
//                         if(req.editpost[0].strThirdPic!= 'blank.jpg')
//                           fs.unlink('public/images/uploaded_images/'+req.editpost[0].strThirdPic);
//                         res.redirect('/profile/'+req.session.user+'/posts/1');
//                     });
//                   });
//                 });
//               });
//             }// all

//           }
//           else
//             res.render('profile/views/invalidpages/postincorrect',{editposttab: req.editpost});
//         });
//     }
//     else
//       res.render('profile/views/invalidpages/postnotmatch',{editposttab: req.editpost});
//   }
// });

exports.profile= router;
