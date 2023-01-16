const  mongoose  = require("mongoose")

const postsSchema=mongoose.Schema({
    title : String,
    body :String,
    device : String,
    userId:String
})

const PostsModel=mongoose.model("posts",postsSchema)
module.exports={PostsModel}