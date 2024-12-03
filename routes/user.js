const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl} = require("../middleware.js");
// const {var} = require() is used when we have to use multiple properties of var
// const var = require() is used for simply use var
 
router.get("/signup",(req,res) => {
    res.render("users/signup.ejs");   
});

router.post("/signup", (async(req,res)=>{
    try{
        let {email,username,password} = req.body;
        const newUser = new User({email,username});
        await User.register(newUser,password); 

        req.login(newUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success",`Hello "${username}", Welcome to Wanderlust`);
            res.redirect("/listings");
        });
        
    }catch (e) {
        console.log("Error during signup:", e.message);
        req.flash("error", e.message); // Make sure this line is reached
        res.redirect("/signup");
    }
    
}));

router.get("/login",(req,res) => {
    res.render("users/login.ejs");
});

// for authentication of user after longin
router.post(
    "/login",  
    savedRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
    }),
    async(req,res)=>{
        let {username} = req.body;
        req.flash("success",`Welcome ${username}`);
        let redirectUrl  = res.locals.redirectUrl || "/listings"; 
        // console.log("Redirecting to:", redirectUrl); 
        res.redirect(redirectUrl);
});

// logout
router.get("/logout",(req,res,next) =>{
    req.logout((err) => {
        if(err){
            return next();
        }
        else{
            req.flash("success","You are logged out");
            res.redirect("/listings");
        }
    })
})


module.exports = router;