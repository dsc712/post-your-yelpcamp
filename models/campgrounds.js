
var mongoose = require("mongoose") ;
//schema setup

var campgroundSchema = new mongoose.Schema({
     name: String ,
     price:String,
     image: String ,
     description : String,
     author : {
         id :{
             type : mongoose.Schema.Types.ObjectId ,
             ref  : "User"
         } , 
         username : String
     },
     comments :[ 
                    {
                        type : mongoose.Schema.Types.ObjectId ,
                        ref  : "Comment"
                    } 
               ]
} , {usePushEach : true } ) ;

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground ;