const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {PostsModel} = require("../models/posts.model")
const postRoute = express.Router()

postRoute.get("/getdata",async(req,res)=>{


    let postdata=await PostsModel.find()
    console.log(postdata)
    res.json(postdata)
})
postRoute.get("/filter",async(req,res)=>{
    const {device}=req.query
    let postdata=await PostsModel.find({device:device})
    console.log(postdata)
    res.json(postdata)
})
postRoute.get("/filters",async(req,res)=>{
    const {device1,device2}=req.query
    let postdata=await PostsModel.find({device:device1,device:device2})
    console.log(postdata)
    res.json(postdata)
})

postRoute.post("/post",async(req,res)=>{
    const data=req.body
    let postdata=await PostsModel.insertMany(data)
    console.log(postdata)
    res.json(postdata)
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
    res.json(" update data")
    }else{
        console.log("not verify")
        res.json("not verify")
    }
})
postRoute.delete("/delete/:Id",async(req,res)=>{
    const {Id}=req.params
    const data=req.body
    let datas=await PostsModel.findOne({_id:Id})
     
    const uid=datas.userId
    const nid=req.body.userId
    if(uid==nid){
    
    // const uid=
    const postdata=await PostsModel.findByIdAndDelete({_id:Id},data)
    console.log(postdata)
    res.json(" delete data")
    }else{
        console.log("not verify")
        res.json("not verify")
    }
})





module.exports={postRoute}