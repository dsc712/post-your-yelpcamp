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
    // FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GithubStrategy = require('passport-github2').Strategy,
    GoogleStrategy = require('passport-google-oauth2').Strategy,
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

// local strategy
passport.use(new LocalStrategy(User.authenticate() )) ;

// facebook strategy
// passport.use(new FacebookStrategy({
//         clientID: auth.facebook.clientID,
//         clientSecret: auth.facebook.clientSecret,
//         callbackURL: auth.facebook.callbackURL
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));

//twitter strategy
passport.use(new TwitterStrategy({
        consumerKey: process.env.twitter_key ,
        consumerSecret: process.env.twitter_secret ,
        callbackURL: "https://post-your-yelpcamps.herokuapp.com/auth/twitter/callback" ,
        passReqToCallback: true
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

// github strategy
passport.use(new GithubStrategy({
        clientID: process.env.github_key,
        clientSecret: process.env.github_secret,
        callbackURL: "https://post-your-yelpcamps.herokuapp.com/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

// google strategy
passport.use(new GoogleStrategy({
        clientID: process.env.google_key,
        clientSecret: process.env.google_secret,
        callbackURL: 'https://post-your-yelpcamps.herokuapp.com/auth/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

//passport configuration
app.use(require("express-session")({
    secret : "whole bunch of text means nothing",
    resave : false ,
    saveUninitialized : false
}));

app.use(express.static(__dirname + "/public")) ;
app.use(flash()) ;

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
app.listen(process.env.PORT || 5000 ,process.env.IP,function(){
    console.log("server started...");
});



