const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {PostsModel} = require("../models/posts.model")
const postRoute = express.Router()

postRoute.get("/get",async(req,res)=>{


    let postdata=await PostsModel.find()
    console.log(postdata)
    res.send(" posts data")
})
postRoute.get("/filter",async(req,res)=>{
    const {device}=req.query
    let postdata=await PostsModel.find({device:device})
    console.log(postdata)
    res.send(" filterd data data")
})
postRoute.get("/filters",async(req,res)=>{
    const {device1,device2}=req.query
    let postdata=await PostsModel.find({device:device1,device:device2})
    console.log(postdata)
    res.send(" filter by 2 data")
})

postRoute.post("/post",async(req,res)=>{
    const data=req.body
    let postdata=await PostsModel.insertMany(data)
    console.log(postdata)
    res.send(" post data")
})

postRoute.patch("/update/:Id",async(req,res)=>{
    const {Id}=req.params
    const data=req.body

    let datas=await PostsModel.findOne({_id:Id})
    
    const uid=datas.userId
    const nid=req.body.userId
    if(uid==nid){
    const postdata=await PostsModel.findByIdAndUpdate({_id:Id},data)
    console.log(postdata)
    res.send(" update data")
    }else{
        console.log("not verify")
        res.send("not verify")
    }
})
postRoute.delete("/delete/:Id",async(req,res)=>{
    const {Id}=req.params
    const data=req.body
    let datas=await PostsModel.findOne({_id:Id})
     l
    const uid=datas.userId
    const nid=req.body.userId
    if(uid==nid){
    
    // const uid=
    const postdata=await PostsModel.findByIdAndDelete({_id:Id},data)
    console.log(postdata)
    res.send(" delete data")
    }else{
        console.log("not verify")
        res.send("not verify")
    }
})





module.exports={postRoute}