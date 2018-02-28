module.exports= (req,res,next)=>{
    req.notif = 0;
    return next();
}