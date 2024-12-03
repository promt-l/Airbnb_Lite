module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        // console.log(req.originalUrl);
        req.session.redirectUrl = req.originalUrl;    // to save url
        req.flash("error","You have to login first to create listing");
        return res.redirect("/login");
    }
    next();
} 

module.exports.savedRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}