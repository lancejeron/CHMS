
module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  if (req.body.email === "" || req.body.password === ""){
    res.render('register/views/invalidpages/blank');
  }
  else{
    db.query("SELECT strEmail FROM tbluser WHERE strEmail= ?",[req.body.email], (err, results, fields) => {
        if (err) console.log(err);
        if(!results[0])
          next();
        else {
          res.render('register/views/invalidpages/taken');
        }
    });
  }

}
