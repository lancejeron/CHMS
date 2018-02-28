
module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  if (req.body.email === "" || req.body.password === ""){
    res.render('admin/invalid/register_invalid_blank');
  }
  else{
    db.query("SELECT strEmail FROM tbluser WHERE strEmail= ?",[req.body.email], (err, results, fields) => {
        if (err) console.log(err);
        if(!results[0])
          next();
        else {
          res.render('admin/invalid/register_invalid_email');
        }
    });
  }

}
