var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function render(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1)
    res.render('sell/views/index', { curdatetab: req.curdate });
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}

router.get('/', flog, render);

router.post('/', flog, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else{
    var db = require('../../lib/database')();
    if (req.body.category == "" || req.body.title == "" || req.body.price == "" || req.body.description == "" || req.body.orderpass == "" ){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else if (!req.files.pic1 && !req.files.pic2 && !req.files.pic3){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else{
      var randomId= makeid();
      if(!req.files.pic1)
        jpeg1= 'blank.jpg';
      else
        jpeg1= req.session.user.concat('-'+randomId+'-1.jpg');
      if(!req.files.pic2)
        jpeg2= 'blank.jpg';
      else
        jpeg2= req.session.user.concat('-'+randomId+'-2.jpg');
      if(!req.files.pic3)
        jpeg3= 'blank.jpg';
      else
        jpeg3= req.session.user.concat('-'+randomId+'-3.jpg');

      if(!req.files.pic2 && !req.files.pic3){
        req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
          db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
              if (err){
                console.log(err);
                res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                }
              db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                if (err) console.log(err);
                res.render('sell/views/success',{ posttab: results1});
              });
          });
        });
      } // 1
      else if(!req.files.pic1 && !req.files.pic3){
        req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
          db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
              if (err){
                console.log(err);
                res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                }
              db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                if (err) console.log(err);
                res.render('sell/views/success',{ posttab: results1});
              });
          });
        });
      } // 2
      else if(!req.files.pic1 && !req.files.pic2){
        req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
          db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
              if (err){
                console.log(err);
                res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                }
              db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                if (err) console.log(err);
                res.render('sell/views/success',{ posttab: results1});
              });
          });
        });
      } // 3
      else if(!req.files.pic3){
        req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
            db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
                if (err){
                  console.log(err);
                  res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                  }
                db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                  if (err) console.log(err);
                  res.render('sell/views/success',{ posttab: results1});
                });
            });
          });
        });
      } // 12
      else if(!req.files.pic2){
        req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
          req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
            db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
                if (err){
                  console.log(err);
                  res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                  }
                db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                  if (err) console.log(err);
                  res.render('sell/views/success',{ posttab: results1});
                });
            });
          });
        });
      } // 13
      else if(!req.files.pic1){
        req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
          req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
            db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
                if (err){
                  console.log(err);
                  res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                  }
                db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                  if (err) console.log(err);
                  res.render('sell/views/success',{ posttab: results1});
                });
            });
          });
        });
      } // 23
      else{
        req.files.pic1.mv('public/images/uploaded_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/uploaded_images/'+jpeg2, function(err) {
            req.files.pic3.mv('public/images/uploaded_images/'+jpeg3, function(err) {
              db.query("INSERT INTO tblitem ( strItemTitle, fltItemPrice, strItemSNum, datPostDate, txtItemDesc, strOrderPass, strFirstPic, strSecondPic, strThirdPic, intItemCat ) VALUES ( ?, ?, ?, (SELECT curdate() AS CD) , ?, ?, ?, ?, ?, (SELECT intCatID FROM tblcategories WHERE strCatName = ?))",[req.body.title, req.body.price, req.session.user, req.body.description, req.body.orderpass, jpeg1, jpeg2, jpeg3, req.body.category], (err, results, fields) => {
                  if (err){
                    console.log(err);
                    res.render('sell/views/invalidpages/invalidinput', { curdatetab: req.curdate });
                    }
                  db.query("SELECT * FROM (SELECT intItemID, strCatName FROM (SELECT * FROM tblitem INNER JOIN tbluser ON strItemSNum= strSNum WHERE strSNum= ?) AS Res INNER JOIN tblcategories ON intItemCat= intCatID ORDER BY intItemID DESC) AS Result LIMIT 1",[req.session.user], (err, results1, fields) => {
                    if (err) console.log(err);
                    res.render('sell/views/success',{ posttab: results1});
                  });
              });
            });
          });
        });
      } // all
    }
  }
});

exports.sell= router;
