
module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  if (req.body.studnum === "" || req.body.studname === "" ||  req.body.email === ""){
    res.render('register/views/invalidpages/blank');
  }
  else{
    db.query("SELECT strSNum FROM tbluser WHERE strSNum= ?",[req.body.studnum], (err, results, fields) => {
        if (err) console.log(err);
        if(!results[0])
          next();
        else {
          res.render('register/views/invalidpages/taken');
        }
    });
  }

}
