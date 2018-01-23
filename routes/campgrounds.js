var express = require("express") ;
var router  = express.Router({mergeParams : true} ) ;
var Campground = require("../models/campgrounds.js");
var methodOverride = require("method-override");
var Comment  = require("../models/comments.js");
var middleware = require("../middleware");


router.use(methodOverride("_method")) ;
//index route
//------------------------------------------------
router.get("/",function(req,res){
   //get all campgrounds from DB
   Campground.find({} , function(err , allCampgrounds){
       if(err){
           console.log(err) ;
       }
       else{
            res.render("campgrounds/index" , {campgrounds : allCampgrounds } );
       }
   }) ;
   
} );
//-----------------------------------------------------



//create route
//-----------------------------------------------------
router.post("/" ,middleware.isLoggedIn ,function(req , res)
{

     var name = req.body.name ;
     var image = req.body.image ;
     var price = req.body.price ;
     var desc = req.body.description;
     var author = {
        id       : req.user._id ,
        username : req.user.username 
     };
     var newCampground = { name: name , image: image , description : desc , author:author , price : price } ;
     
     Campground.create(newCampground , function(err , newlyCreated){
         if(err)
         {
             console.log(err) ;
         }
         else
         {
             console.log(newlyCreated) ;
             req.flash("success","You successfully created new campground") ;
             res.redirect("/campgrounds");
         } 
     }) ;
    
     
}) ;
//-----------------------------------------------------------



//new route
//-----------------------------------------------------------
router.get("/new",middleware.isLoggedIn,function(req,res){
 res.render("campgrounds/new") ;    
});

//-----------------------------------------------------------



//show route
//-----------------------------------------------------------
router.get("/:id",function(req ,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
          console.log(err) ;
           }
         else{
          console.log(foundCampground) ;
          res.render("campgrounds/show" , {campground : foundCampground}) ;
         }
    }) ;
});
//-------------------------------------------------------------



//edit campground route
  router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
      Campground.findById(req.params.id , function(err , foundCampground){
          if(err)
           {
               console.log(err) ;
               res.redirect("back") ;
           }
           else{
             
             res.render("campgrounds/edit" , {campground : foundCampground } ) ;
           }
      });
               
     
  });

//-------------------------------------------------------------


//update campground route
 router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , updatedCampground){
        if(err){
            console.log(err) ;
            res.redirect("/campgrounds") ;
        }
        else{
            req.flash("success","You successfully updated Your campground") ;
            res.redirect("/campgrounds/" + req.params.id ) ;
        }
    }) ;
 });  

//-----------------------------------------------------

//delete campground route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id , function(err){
      if(err)
      {
          res.redirect("/campgrounds") ;
      }
      else{
         req.flash("success","Your Campground successfully removed") ;
         res.redirect("/campgrounds") ; 
      }
    });
});

//-------------------------------------------------------

 
 
module.exports = router ;

