
module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE intID= ?",[req.session.user], function (err, results, fields) {
      if (err) console.log(err);
      if (!results[0])
        req.valid = 0;
      else if (results[0].strStatus == 'admin')
        req.valid = 2;
      else if (results[0].strStatus == 'banned')
        req.valid = 3;
      else
        req.valid = 1;
      req.user = results;
      return next();
    });
  }
  
  // db.query("SELECT * FROM tbluser WHERE strSNum= ?",[req.session.user], function (err, results, fields) {
  //   if (err) console.log(err);
  //   if (!results[0])
  //     req.valid = 0;
  //   else if (results[0].strStatus == 'admin')
  //     req.valid = 2;
  //   else if (results[0].strStatus == 'banned')
  //     req.valid = 3;
  //   else
  //     req.valid = 1;
  //   req.user = results;
  //   return next();