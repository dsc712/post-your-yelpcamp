var express     = require("express") ,
    app         = express() ,
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose") ,
    Campground  = require("./models/campgrounds") ,   //it adds .js implicitly(in front of campgrounds) and also (var Campground) is not a mandatory name
                                                     //all mongodb methods like find() , create() , findById() etc will be called using (var Campground)
                                                     
    Comment     = require("./models/comments") ,    //it adds .js implicitly(in front of comments) and also (var Comment) is not a mandatory name
                                                     //all mongodb methods like find() , create() , findById() etc will be called using (var Comment)  
    passport    = require("passport"),
LocalStrategy   = require("passport-local") ,
    User        = require("./models/user"),
methodOverride  = require("method-override"),
    flash       = require("connect-flash"),
    seedDb      = require("./seeds") ;
    
//requiring routes    
var commentRoutes     = require("./routes/comments.js") ,
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes        = require("./routes/index.js") ;
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp" ;
mongoose.connect(url) ;

app.use(bodyParser.urlencoded( {extended : true} ) );
app.set("view engine" , "ejs");

//for using custom stylesheets

//seedDb() ;    //seeding all the data

//passport configuration
app.use(require("express-session")({
    secret : "whole bunch of text means nothing",
    resave : false ,
    saveUninitialized : false
}));

app.use(express.static(__dirname + "/public")) ;
app.use(flash()) ;

passport.use(new LocalStrategy(User.authenticate() )) ;
passport.serializeUser(User.serializeUser() ) ;
passport.deserializeUser(User.deserializeUser() );


app.use(passport.initialize());
app.use(passport.session()) ;

//midleware - this will be called after every route confirming that currentUser is passed to every template
app.use(function(req , res , next){
   res.locals.currentUser = req.user ; 
   res.locals.error = req.flash("error") ;
    res.locals.success = req.flash("success") ;
   next() ;
});



//requiring routes
 app.use("/campgrounds",campgroundRoutes); // it appends "/campgrounds in front of every campground routes in campgrounds.js"
 app.use("/campgrounds/:id/comments",commentRoutes) ; // it appends /campgrounds/:id/comments
 app.use("/",indexRoutes) ;
 
 app.use(methodOverride("_method") ) ;

//setting up the IP and PORT - mandatory for server to start listening
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started...");
});



