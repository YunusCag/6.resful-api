
const admin=(req,res,next) => {

    if(req.user && !req.user.isAdmin){
        return res.status(403).json({
            message:"You are not admin user. Your permission has been revoked."
        })
    }
    next();
};

module.exports=admin;