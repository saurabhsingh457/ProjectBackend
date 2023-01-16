const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        if(token){
            const decode=jwt.verify(token,"secret")
            if(decode){
                const userId=decode.userId
                req.body.userId=userId
                next()
            }else{
                console.log("error in auth")
                res.send('invalid')
            }
        }
    } catch (error) {
        console.log("error")
    }
}
module.exports={auth}