const  mongoose  = require("mongoose")

const postsSchema=mongoose.Schema({
    img : String,
    h2 :String,
    p: String,
    h3: String,
    userId:String
})

const PostsModel=mongoose.model("datas",postsSchema)
module.exports={PostsModel}