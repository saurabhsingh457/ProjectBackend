const mongoose=require("mongoose")
const express=require("express")
const connection=require("./configuration/config")
const cors=require("cors")
// const express = require("express")
require("dotenv").config()

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

const { userRoute } = require("./routes/user.route")

app.use("/users",userRoute)
app.get("/",(req,res)=>{
    res.send("hello")
    console.log("hello")
})

const {auth}=require("./authentication/authentication")
app.use(auth)
const { postRoute } = require("./routes/post.rote")
app.use("/posts",postRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connection")
    } catch (error) {
        console.log(error)
    }
    console.log("server running")
})