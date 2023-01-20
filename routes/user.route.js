const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRoute = express.Router()


userRoute.post("/register", async (req, res) => {
    const {   name,email, gender,  pass }=req.body
let data=await UserModel.findOne({email})
if(data){
    console.log("already present try with different email")
    res.json("already present try diffrent email")
}else{
    try {
        bcrypt.hash(pass, 5,async (err, securepass)=> {
            if(err){
           console.log(err)
           res.json(err)
            }else{
                const user=new UserModel({   name,email, gender,  pass:securepass })
                await user.save()
                res.json("registerd succesfully")
                console.log("registerd successfully")
            }
        });
    } catch (error) {
        console.log(error)
        res.json("error while registering")
    }
}
    
})




userRoute.post("/login", async (req, res) => {
    const {   email,  pass }=req.body
try {
    const user=await UserModel.find({email})
    if(user.length>=0){
        let securepass=user[0].pass
        bcrypt.compare(pass, securepass, (err, result) =>{
            if(result){
            var token = jwt.sign({ userId: user[0]._id }, 'secret');
            res.json(token)
            console.log(token)
            }else{
                console.log('wrong details')
                res.json("wrong detail")
            }
        });
    }else{
        res.json("problem in login")
        console.log("problem in login")
    }
} catch (error) {
    console.log(error)
    res.json("problem while login")
}

    
})

module.exports={userRoute}