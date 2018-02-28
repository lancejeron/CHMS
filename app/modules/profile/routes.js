var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');
var fs = require('fs');
//profile
function findmyuser(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CURDATE(), TIMESTAMPDIFF(YEAR,datBirthday,CURDATE()) AS Age FROM tbluser WHERE intID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.user= results;
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
      res.render('profile/views/index',{usertab: req.user, transtab: req.trans});
    else
      res.render('profile/views/otherprofile',{usertab: req.user, transtab: req.trans});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
}

//sent invite
function findinvite(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,date_format(timTimeTrans,'%h:%i:%s %p' ) as mytime, DATE_FORMAT(datDateTrans, '%W %M %e %Y')  as mydate  FROM tbltransaction INNER JOIN tbluser ON tbltransaction.intTransID_intID2=tbluser.intID INNER JOIN tblcoffeeshop  ON tblcoffeeshop.intCID=tbltransaction.intTransID_intCID  WHERE strTransStatus='pending' AND intTransID_intID=?",[req.session.user], function (err, results, fields) {
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
  req.trans = results;
  return next();
  });
}
function renderinvite(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.trans[0]){
      if(req.params.page == 1)
        res.render('profile/views/noinvite');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/invite',{ usertab: req.user, transtab: req.trans, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}

//received invite
function findrinvite(req,res,next){
  var db = require('../../lib/database')(); 
  // db.query("SELECT * FROM tbltransaction WHERE strTransStatus='pending' AND intTransID_intID2=?",[req.session.user], function (err, results, fields) {
    db.query("SELECT transact.intTransID AS TransactionID, transact.strTransDetails AS Detalye, DATE_FORMAT(timTimeTrans, '%h:%i:%s %p') AS Mytime, DATE_FORMAT(datDateTrans, '%W %M %e %Y') AS Mydate, intCID, strCName, user1.intID AS NaginviteID, user2.intID AS IninviteID, user1.strName AS Nanginvite, user2.strName AS Ininvite, user1.strPicture AS NanginvitePic, user2.strPicture AS IninvitePic, transact.strTransStatus AS Kalagayan FROM tbltransaction AS transact INNER JOIN  tbluser AS user1 ON user1.intID = transact.intTransID_intID INNER JOIN tbluser AS user2 ON user2.intID = transact.intTransID_intID2 INNER JOIN tblcoffeeshop AS cf ON cf.intCID = transact.intTransID_intCID WHERE strTransStatus='pending' AND intTransID_intID2=?",[req.session.user], function (err, results, fields) {  
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
  req.trans = results;
  return next();
  });
}
function renderrinvite(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.trans[0]){
      if(req.params.page == 1)
        res.render('profile/views/norinvite');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/rinvite',{ usertab: req.user, transtab: req.trans, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
//edit
function fedituser(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE intID= ?",[req.session.user], (err, results, fields) => {
      if (err) console.log(err);
      req.user= results;
      return next();
    });
}
function editprofilerender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1)
    res.render('profile/views/editprofile',{usertab: req.user});
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
router.get('/-/edit', flog, fedituser, editprofilerender);

router.post('/-/edit/:userid',flog, fedituser, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    var db = require('../../lib/database')();
    if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && req.body.picture5==''){//No Picture at all
      db.query("UPDATE tbluser SET strName=?, strAddress=?, strFavCoffee=?, strBio=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });         
    }
    else if(req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){// No picture 1/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture2=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture3=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture3, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture3=='' && !req.body.picture2=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 3/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture2=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture2, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture4=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 1 & 4/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture2=?, strPicture3=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture2, req.body.picture3, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture5=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 1 & 5/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture2=?, strPicture3=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture2, req.body.picture3, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2 & 3/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture4=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 1 & 2 & 4/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture3=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture3, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture5=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 1 & 2 & 5/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture3=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture3, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && !req.body.picture5==''){//no picture 1 & 2 & 3 & 4/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && !req.body.picture4==''){//no picture 1 & 2 & 3 & 5/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && !req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && req.body.picture4==''){//no picture 1 & 3 & 4 & 5/
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture2=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture2, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture1=='' && req.body.picture2=='' && !req.body.picture3=='' && req.body.picture5=='' && req.body.picture4==''){//no picture 1 & 2 & 4 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture3=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture3, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 2
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture3, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && !req.body.picture1=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 2 & 3
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 2 & 4
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture3=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture3, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 2 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture3=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture3, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture5==''){//no picture 2 & 3 & 4
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture4==''){//no picture 2 & 3 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture2=='' && req.body.picture3=='' && req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1==''){//no picture 2 & 3 & 4 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture3=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture4=='' && !req.body.picture5==''){//no picture 3
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture3=='' && req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture5==''){//no picture 3 & 4
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture3=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture4==''){//no picture 3 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture3=='' && req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2==''){//no picture 3 & 4 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture4=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture5==''){//no picture 4
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture3=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture5, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture4=='' && req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3==''){//no picture 4 & 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture3=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture3, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(req.body.picture5=='' && !req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4==''){//no picture 5
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture3=?, strPicture4=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.session.user], (err, results1, fields) => {
      res.redirect('/profile/'+req.session.user);
      });
    }
    else if(!req.body.picture1=='' && !req.body.picture2=='' && !req.body.picture3=='' && !req.body.picture4 == ''&& !req.body.picture5==''){// ALL Changed
      db.query("UPDATE tbluser SET strName= ?, strAddress=?, strFavCoffee=?, strBio=?,  strPicture=?, strPicture2=?, strPicture3=?, strPicture4=?, strPicture5=? WHERE intID=? ",[req.body.name, req.body.address, req.body.favcoffee, req.body.bio,  req.body.picture1, req.body.picture2, req.body.picture3, req.body.picture4, req.body.picture5, req.session.user], (err, results1, fields) => {
        res.redirect('/profile/'+req.session.user);
      });
    }
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
});





router.get('/', flog, (req, res) => {
  res.redirect('/profile/'+req.session.user);
});
router.get('/:userid',flog,findmyuser,rendermyuser);
router.get('/-/invite/:page', flog, findinvite, fedituser, renderinvite);
router.get('/-/rinvite/:page', flog, findrinvite, fedituser, renderrinvite);

//approve
function approverender(req,res){
  if(req.valid==1){
    var db = require('../../lib/database')();
    var sql = "UPDATE tbltransaction SET strTransStatus= 'ongoing' WHERE intTransID= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/profile/-/rinvite/1');
    });
  }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function freguser(req, res, next){
  var db = require('../../lib/database')();
  var sql = "SELECT * FROM tbluser WHERE intID= ?";
  db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      req.reguser = results;
      return next();
  });
}
router.get('/invitation/approve/:userid',flog,freguser,approverender)

//reject
function rejectrender(req,res){
  if(req.valid==1){
    var db = require('../../lib/database')();
    var sql = "UPDATE tbltransaction SET strTransStatus= 'reject' WHERE intTransID= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/profile/-/rinvite/1');
    });
  }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/invitation/reject/:userid',flog,rejectrender)

//Cancel
function cancelrender(req,res){
  if(req.valid==1){
    var db = require('../../lib/database')();
    var sql = "UPDATE tbltransaction SET strTransStatus= 'cancel' WHERE intTransID= ?";
    db.query(sql,[req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/profile/-/ogtransaction/1');
    });
  }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/invitation/cancel/:userid',flog,cancelrender)

//transactions ongoing
function ftrans(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT transact.intTransID AS TransactionID, transact.strTransDetails AS Detalye, DATE_FORMAT(timTimeTrans, '%h:%i:%s %p') AS Mytime, DATE_FORMAT(datDateTrans, '%W %M %e %Y') AS Mydate, intCID, strCName, user1.intID AS NaginviteID, user2.intID AS IninviteID, user1.strName AS Nanginvite, user2.strName AS Ininvite, user1.strPicture AS NanginvitePic, user2.strPicture AS IninvitePic, transact.strTransStatus AS Kalagayan FROM tbltransaction AS transact INNER JOIN  tbluser AS user1 ON user1.intID = transact.intTransID_intID INNER JOIN tbluser AS user2 ON user2.intID = transact.intTransID_intID2 INNER JOIN tblcoffeeshop AS cf ON cf.intCID = transact.intTransID_intCID WHERE strTransStatus = 'ongoing' AND (intTransID_intID2=? OR intTransID_intID=?)",[req.session.user,req.session.user], function (err, results, fields) {
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
  req.trans = results;
  return next();
  });
}
function transrender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.trans[0]){
      if(req.params.page == 1)
        res.render('profile/views/noongoingtransaction');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/ongoingtransaction',{ usertab: req.user, transtab: req.trans, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
router.get('/-/ogtransaction/:page', flog, ftrans, fedituser, transrender);

//transaction finished
function ftransf(req,res,next){
  var db = require('../../lib/database')();
  db.query(`update tbltransaction set strTransStatus='finished' where strTransStatus='ongoing' AND datDateTrans<CURDATE() AND (intTransID_intID=? OR intTransID_intID2=?)`,[req.session.user, req.session.user])
  db.query("SELECT transact.intTransID AS TransactionID, transact.strTransDetails AS Detalye, DATE_FORMAT(timTimeTrans, '%h:%i:%s %p') AS Mytime, DATE_FORMAT(datDateTrans, '%W %M %e %Y') AS Mydate, intCID, strCName, user1.intID AS NaginviteID, user2.intID AS IninviteID, user1.strName AS Nanginvite, user2.strName AS Ininvite, user1.strPicture AS NanginvitePic, user2.strPicture AS IninvitePic, transact.strTransStatus AS Kalagayan FROM tbltransaction AS transact INNER JOIN  tbluser AS user1 ON user1.intID = transact.intTransID_intID INNER JOIN tbluser AS user2 ON user2.intID = transact.intTransID_intID2 INNER JOIN tblcoffeeshop AS cf ON cf.intCID = transact.intTransID_intCID WHERE strTransStatus = 'finished' AND (intTransID_intID2=? OR intTransID_intID=?)",[req.session.user,req.session.user], function (err, results, fields) {
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
  req.trans = results;
  return next();
  });
}
function transrenderf(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.trans[0]){
      if(req.params.page == 1)
        res.render('profile/views/nofinishedtransaction');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/finishedtransaction',{ usertab: req.user, transtab: req.trans, friendtab:req.friend,  pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
router.get('/-/ftransaction/:page', flog, ftransf, fedituser, transrenderf);

//Add friend
function addrender(req,res){
  var db = require('../../lib/database')();
  if(req.valid==1){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblfriend where (intID_Me=? OR intID_Friend=?) AND (intID_Me=? OR intID_Friend=?);",[req.session.user,req.session.user,req.params.userid,req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      if (!results[0]){
        var sql = "INSERT INTO tblfriend (intID_Me,intID_Friend,strRelasyon) VALUES (?,?,'pending')";
        db.query(sql,[req.session.user,req.params.userid], function (err, results, fields) {
          if (err) return res.send(err);
        res.redirect('/profile/-/ftransaction/1');
      });
      }
      else if(results[0].strRelasyon=='pending'||results[0].strRelasyon=='friend'){
      if (err) console.log(err);
      res.redirect('/profile/-/ftransaction/1')
    }
  });
}
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/coffeemate/add/:userid',flog,addrender);

//Rate Coffeeshop

function findcoffeeshop(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblcoffeeshop WHERE intCID= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.coffee= results;
      return next();
    });
}
function raterendercoffeeshop(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if (!req.coffee[0])
      res.render('login/views/noroute');
    else
      res.render('profile/views/ratecoffeeshop',{coffeetab: req.coffee, usertab: req.user, transtab: req.trans});
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/noroute');
}
router.get('/coffeeshop/rate/:userid',flog,findcoffeeshop,raterendercoffeeshop);

function raterender(req,res){
  var db = require('../../lib/database')();
  if(req.valid==1){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblrating where intRating_intID=? AND intRating_intCID=?",[req.session.user,req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      if (!results[0]){
        var sql = "INSERT INTO tblrating (intRating_intID, intRating_intCID, intRating) VALUES (?,?,?)";
        db.query(sql,[req.session.user,req.params.userid,req.body.rating], function (err, results, fields) {
          db.query("UPDATE tblcoffeeshop set intCRating=( SELECT SUM(b.intRating) FROM tblrating as b where b.intRating_intCID=tblcoffeeshop.intCID)")
          if (err) return res.send(err);
        res.redirect('/profile/-/ftransaction/1');
      });
      }
      else if(results[0].intRating_intID==req.session.user && results[0].intRating_intCID==req.params.userid){
        var sql = "UPDATE tblrating SET intRating=? WHERE intRating_intID=? and intRating_intCID=?";
        db.query(sql,[req.body.rating,req.session.user,req.params.userid], function (err, results, fields) {
          db.query("UPDATE tblcoffeeshop set intCRating=( SELECT SUM(b.intRating) FROM tblrating as b where b.intRating_intCID=tblcoffeeshop.intCID)")
          if (err) return res.send(err);
        res.redirect('/profile/-/ftransaction/1');
      });
    }
  });
}
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.post('/coffeeshop/rate/:userid',flog,raterender);



//My coffeemate
function findfriend(req,res,next){
  var db = require('../../lib/database')();
  // db.query("SELECT *,CURDATE(), TIMESTAMPDIFF(YEAR,datBirthday,CURDATE()) AS Age from tblfriend INNER JOIN tbluser ON tblfriend.intID_Friend=tbluser.intID WHERE strRelasyon='friend' AND (intID_Me = ? OR intID_friend = ?)",[req.session.user,req.session.user], (err, results, fields) => {
  db.query("SELECT user1.intID AS NanginviteID, user1.strName AS Nanginvite, user2.intID AS IninviteID, user2.strName AS Ininvite, user1.strPicture AS NanginvitePic, user2.strPicture2 AS IninvitePic FROM tblfriend AS fr INNER JOIN tbluser AS user1 ON user1.intID = fr.intID_me INNER JOIN tbluser AS user2 ON user2.intID = fr.intID_Friend WHERE strRelasyon = 'friend' AND (intID_Me =? OR intID_Friend =?)",[req.session.user,req.session.user], (err, results, fields) => {
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
  req.friend = results;
  return next();
  });
}
function renderfriend(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.friend[0]){
      if(req.params.page == 1)
        res.render('profile/views/nocoffeemate');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/mycoffeemate',{ usertab: req.user, transtab: req.trans, friendtab: req.friend, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
router.get('/-/mycoffeemate/:page',flog,findfriend,fedituser,renderfriend);

//Coffeemate Request
function findrfriend(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CURDATE(), TIMESTAMPDIFF(YEAR,datBirthday,CURDATE()) AS Age from tblfriend INNER JOIN tbluser ON tblfriend.intID_Me=tbluser.intID WHERE strRelasyon='pending' AND intID_Friend= ?",[req.session.user], (err, results, fields) => {
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
  req.friend = results;
  return next();
  });
}

function renderrfriend(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  if(req.valid==1){
    if(!req.friend[0]){
      if(req.params.page == 1)
        res.render('profile/views/normycoffeemate');
        else
        res.render('login/views/noroute');
      }
    else if(req.params.page < 1 || req.params.page > req.lastpage[0])
    res.render('login/views/noroute');
    else
      res.render('profile/views/rmycoffeemate',{ usertab: req.user, transtab: req.trans, friendtab: req.friend, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage, statustab: req.status});
    }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
router.get('/-/rmycoffeemate/:page',flog,fedituser,findrfriend,renderrfriend);

// Remove
function removerender(req,res){
  if(req.valid==1){
    var db = require('../../lib/database')();
    var sql = "DELETE FROM tblfriend WHERE (intID_Me=? OR intID_Friend=?) AND (intID_Me= ? OR intID_Friend=?)";
    db.query(sql,[req.session.user, req.session.user, req.params.userid, req.params.userid], function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/profile/-/mycoffeemate/1');
    });
  }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/invitation/remove/:userid',flog,removerender)

// Accept
function acceptrender(req,res){
  if(req.valid==1){
    var db = require('../../lib/database')();
    var sql = "UPDATE tblfriend SET strRelasyon= 'friend' WHERE strRelasyon='pending' AND intID_Friend= ? AND intID_Me=?";
    db.query(sql,[req.session.user,req.params.userid],function (err, results, fields) {
      if (err) return res.send(err);
      res.redirect('/profile/-/rmycoffeemate/1');
    });
  }
  else if(req.valid==2)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/invitation/accept/:userid',flog,acceptrender)



exports.profile= router;
