var express = require("express") ;
var router  = express.Router({mergeParams : true}) ;
var passport= require("passport") ;
var User    = require("../models/user.js") ;

//root route
//-----------------------------------------------
router.get("/",function(req , res){
   res.render("landing") ;   // landing is present in views directory 
});
//-----------------------------------------------


//============================
//Auth Routes
//============================

 router.get("/register",function(req,res){
     res.render("register");
 });

 //handling the signup form
 
 router.post("/register",function(req,res){
    var newUser = new User({username : req.body.username } ) ;
    User.register(newUser , req.body.password,function(err , user ){
        if(err)
         {
             console.log(err) ;
             req.flash("error" , err.message ) ;
             return res.render("register") ;
         }
         else{
             passport.authenticate("local")(req,res,function(){
                  req.flash("success","Thanks for signing up here") ;
                  res.redirect("/campgrounds");
             });
         }
    } ) ;
 });


router.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){});

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/campgrounds');
    });

router.get('/auth/twitter',
    passport.authenticate('twitter'),
    function(req, res){});

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/campgrounds');
    });

router.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){});

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/campgrounds');
    });


router.get('/auth/google',
    passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ] }
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/campgrounds');
    });


 //show login form
  router.get("/login",function(req , res){
    res.render("login") ;    
  });
 //handling login logic
 
 //app.post("/login" ,middleware , callback)
 router.post("/login",passport.authenticate("local" ,
 {
     successRedirect : "/campgrounds" ,
     failureRedirect : "/login"
 }), function(req , res){
     
 });
 
 //logout logic
 router.get("/logout" , function(req,res){
     
     req.logout() ;
     req.flash("success","logged you out") ;
     res.redirect("/campgrounds") ;
 });
 


 function isLoggedIn(req , res ,next){
     if(req.isAuthenticated() )
     {
         return next() ;
     }
     res.redirect("/login") ;
 }
 
 module.exports = router ;