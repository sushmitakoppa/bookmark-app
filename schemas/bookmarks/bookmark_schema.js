const mongoose=require('mongoose');


// var bookmarksSchema=mongoose.Schema;


var bookmarksSchema=new mongoose.Schema({
    url:String,
    desc:String,
    tags:[String]
})
const List_of_bookmark=mongoose.model('List_of_Bookmark',bookmarksSchema)    //returns a class



module.exports=List_of_bookmark