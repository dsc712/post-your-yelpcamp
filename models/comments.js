var mongoose = require("mongoose") ;

//schema setup

var commentSchema = new mongoose.Schema({
     text  : String ,
     author: {
          id :{
             type : mongoose.Schema.Types.ObjectId ,
             ref  : "User"
          } ,
          username: String
     },
     created : {type : Date , default : Date.now }
} , {usePushEach : true });

module.exports = mongoose.model("Comment" , commentSchema) ;