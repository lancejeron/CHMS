var express = require('express');
var flog = require( '../home/loggedin');
var router = express.Router();

function findmycoffeeshop(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblcoffeeshop WHERE strStatus="registered" AND intCID_intID=?`,[req.session.user], function (err, results, fields) {
      if (err) return res.send(err);
    req.stud = results;
    return next();
  });
  }
  
function rendermycoffeeshop(req,res){
    if(req.valid==3){
    res.render('login/views/invalidpages/banned');
    }
    if(req.valid==4){
      if(!req.stud[0]){
          res.render('managecoffeeshop/views/nocoffeeshop');
      }
      else
        res.render('managecoffeeshop/views/index',{ usertab: req.user, studtab: req.stud, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
    else if(req.valid==2)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }

  router.get('/page/:page', flog, findmycoffeeshop, rendermycoffeeshop);

  router.post('/page/:page/add',(req, res) => {
    var db = require('../../lib/database')();
    db.query(`INSERT INTO tblcoffeeshop (strCName, strCAddress, strCTnumber, intCRating, strSpecial, strPermit, strStatus, intCID_intID)  VALUES ("${req.body.Cname}","${req.body.Caddress}","" ,"0", "", "${req.body.bpermit}" ,"unregistered","${req.session.user}")`, (err, results, fields) => {
      if (err) console.log(err);
      res.redirect('/home2/page/1');
      });
    });

//View Coffeeshop
function findcoffeeshop(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tblcoffeeshop.strPicture AS litrato,tblcoffeeshop.strPicture2 AS litrato2, tblcoffeeshop.strPicture3 AS litrato3, tblcoffeeshop.strPicture4 AS litrato4, tblcoffeeshop.strPicture5 AS litrato5 FROM tblcoffeeshop INNER JOIN tbluser ON tbluser.intID=tblcoffeeshop.intCID_intID WHERE intCID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.coffee= results;
      return next();
    });
}
function rendercoffeeshop(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==4){
    if (!req.coffee[0])
      res.render('login/views/noroute');
    else
      res.render('managecoffeeshop/views/viewcoffeeshop',{coffeetab: req.coffee, transtab: req.trans});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
}
router.get('/page/:page/viewcoffeeshop/:userid',flog,findcoffeeshop,rendercoffeeshop)

//edit coffeeshop
function findeditcoffeeshop(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblcoffeeshop INNER JOIN tbluser ON tbluser.intID=tblcoffeeshop.intCID_intID WHERE intCID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.coffee= results;
      return next();
    });
}
function rendereditcoffeeshop(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==4){
    if (!req.coffee[0])
      res.render('login/views/noroute');
    else
      res.render('managecoffeeshop/views/editcoffeeshop',{coffeetab: req.coffee, transtab: req.trans});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
}
router.get('/page/:page/editcoffeeshop/:userid',flog,findeditcoffeeshop,rendereditcoffeeshop)

function feditcoffeeshop(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblcoffeeshop WHERE intCID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.coffee= results;
      return next();
    });
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/page/:page/editcoffeeshop/:userid',flog,feditcoffeeshop, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==4){
    var db = require('../../lib/database')();
    if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && req.body.picture5==''){//No Picture at all
      // db.query("UPDATE tblcoffeeshop SET strCName=?, strCAddress=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress,req.params.userid], (err, results1, fields) => {
      db.query("UPDATE tblcoffeeshop SET strCName=?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });         
    }
    else if(req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){// No picture 1/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture2=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture3, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture3=='' && !req.body.picture2=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 3/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture2=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture2, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture4=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 1 & 4/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture2=?, strPicture3=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture2, req.body.picture3, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture5=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 1 & 5/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture2=?, strPicture3=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture2, req.body.picture3, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2 & 3/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture4=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 1 & 2 & 4/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture3=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture3, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture5=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 1 & 2 & 5/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture3=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture3, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2 & 3 & 4/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && !req.body.picture4==''){//no picture 1 & 2 & 3 & 5/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && !req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && req.body.picture4==''){//no picture 1 & 3 & 4 & 5/
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture2=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture2, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && !req.body.picture3=='' && req.body.picture5=='' && req.body.picture4==''){//no picture 1 & 2 & 4 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture3=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture3, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 2
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture3, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && !req.body.picture1=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 2 & 3
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 2 & 4
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture3=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture3, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 2 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture3=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture3, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture5==''){//no picture 2 & 3 & 4
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture4==''){//no picture 2 & 3 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1==''){//no picture 2 & 3 & 4 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture3=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 3
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture3=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture5==''){//no picture 3 & 4
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture3=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture4==''){//no picture 3 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture3=='' && req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2==''){//no picture 3 & 4 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 4
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture3=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture5, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3==''){//no picture 4 & 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture3=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture3, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 5
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture3=?, strPicture4=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.params.userid], (err, results1, fields) => {
      res.redirect('/managecoffeeshop/page/1');
      });
    }
    else if(!req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4 == ''&& !req.body.picture5==''){// ALL Changed
      db.query("UPDATE tblcoffeeshop SET strCName= ?, strCAddress=?, strCTnumber=?, strSpecial=?, strDetails=?, strMenu=?, strMenu2=?, strMenu3=?, strMenu4=?, strMenu5=?, strPicture=?, strPicture2=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intCID=? ",[req.body.Cname, req.body.Caddress, req.body.Ctnumber, req.body.Cspecial, req.body.Cdetail, req.body.menu1, req.body.menu2, req.body.menu3, req.body.menu4, req.body.menu5, req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.params.userid], (err, results1, fields) => {
        res.redirect('/managecoffeeshop/page/1');
      });
    }
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
});
exports.managecoffeeshop= router;