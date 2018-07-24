var express = require("express") ;
var router  = express.Router( {mergeParams :true } ) ;
var Comment  = require("../models/comments.js");
var Campground = require("../models/campgrounds.js");
var methodOverride  = require("method-override") ;
var middleware =require("../middleware") ;

router.use(methodOverride("_method")) ;
//------------------------------------------------------------
// -------COMMENTS ROUTES------------------------------------
//------------------------------------------------------------


// new comment route
//----------------------------------------------------------
router.get("/new",middleware.isLoggedIn,function(req,res){
    //find campground by id
    
    Campground.findById(req.params.id , function(err,campground){
        if(err)
        {
            console.log(err) ;
        }
        else
        {
           res.render("comments/new" , {campground : campground }) ; 
        }
    }) ;
    
    
 });



//create comment route
//----------------------------------------------------------------

router.post("/" ,middleware.isLoggedIn, function(req , res){
    
    Campground.findById(req.params.id , function(err , campground ) {
    if(err)
    {
        console.log(err) ;
        req.flash("error occured") ;
        res.redirect("/campgrounds") ;
    }
    else
    {
        Comment.create(req.body.comment , function(err , comment){
            if(err){
                console.log(err) ;
            }
            else{

                    console.log(req.user._id) ;
                    //add username and id to the object
                    comment.author.id       = req.user._id ;
                    comment.author.username = req.user.username ;
                    //save comment
                    comment.save() ;

                    //associate the comment with campground's object
                    campground.comments.push(comment);
                    campground.save() ;

                    req.flash("success","You commented on "+ campground.name ) ;
                    res.redirect("/campgrounds/" + campground._id) ;


            }
            
        })  ; 
    }
    
   });
   
});

//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id , function(err , foundComment){
        if(err)
         {
             res.redirect("back") ;
         }else{
              res.render("comments/edit",{campground_id : req.params.id , comment : foundComment}) ;
         }
    })  ;  
   
});

//comment update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , function(err , updatedCampground){
       if(err)
        {
            req.flash("error","you dont have permission to do that") ;
            res.redirect("back") ;
        }
        else{
            req.flash("success","comment updated successfully") ;
            res.redirect("/campgrounds/" + req.params.id ) ;
        }
    });
});
//comment destroy route

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req , res){
   Comment.findByIdAndRemove(req.params.comment_id , function(err){
       if(err)
        res.redirect("back") ;
       else{
        req.flash("success","comment deleted") ;
        res.redirect("/campgrounds/"+ req.params.id ) ;
       }
   })  ;  
});


 
module.exports = router ;












