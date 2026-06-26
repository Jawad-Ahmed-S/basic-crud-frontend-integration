const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const User = require('./models/userModel')
const app = express()
// app.use(dotenv())
app.use(cors())
app.use(express.json())

app.post("/create",async (req,res)=>{
    const user = await User.create(req.body)
    res.status(200).json({sucess:true,user})
})

app.get("/",async(req,res)=>{
    const users = await User.find()
    res.status(200).json(users)
})

app.get("/getUser/:id",async(req,res)=>{
    
    const user =await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({sucess:false,message:"Not Found!"})
        
    }
    res.status(200).json(user)
})
app.put("/update/:id",async(req,res)=>{
    
    const updatedata = req.body
    const user =await  User.findById(req.params.id)
    if(!user){
        return res.status(400).json({sucess:false,message:"Not Found!"})
        
    }
    const updatedUser =await  User.findByIdAndUpdate(req.params.id,updatedata)

    res.status(200).json(updatedUser)
}).get("/update/:id",async(req,res)=>{
    
    const user =await  User.findById(req.params.id)
    if(!user){
        return res.status(400).json({sucess:false,message:"Not Found!"})
        
    }
    res.status(200).json(user)
})

app.delete("/delete/:id",async(req,res)=>{
    
    const user =await  User.findById(req.params.id)
    if(!user){
        return res.status(400).json({sucess:false,message:"Not Found!"})
    }

    const deletedUser =await  User.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedUser)
})

mongoose.connect("mongodb+srv://jawadahmedcode_db_user:QqTGWYHqrjv05pCR@cluster0.khc3wy8.mongodb.net").then(console.log("mongodb connected!"))

app.listen(8000,()=>{console.log("Server Started!")})
