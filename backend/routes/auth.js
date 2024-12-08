const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/userSchema')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="harrybhai"


const router = express.Router()

//Create a User:Doesn't require AUth usin post
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
],
   async (req, res) => {
    let success=true
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success=false
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            let user=await User.findOne({email:req.body.email})
            console.log(user)
            if(user){
                success=false
               return res.status(400).send(success,"Sorry User with this email already exist")
            }
            else{
                const salt=await bcrypt.genSalt(10)
                const  secPass=await bcrypt.hash(req.body.password,salt)
                    
           user= await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_SECRET)
            res.json({success,authtoken})
        }
       
            
        } catch (error) {
          console.error("Some intrnal eroor occured")
        }
       
    })

    //Route 2:Login endpoint 
    router.post('/login',[
        body('email','Please enter valid email').isEmail(),
        body('password','Password cannot be blank').exists(),
    ],async (req,res)=>{
        let success=true
        const errors=validationResult(req)
        if (!errors.isEmpty()) {
            success=false
            return res.status(400).json({ errors: errors.array() })
        }
        try{
        const {email,password}=req.body
        let user=await User.findOne({email})
        if(!user){
            success=false
           return res.status(400).json({error:"Please login with correct credientials"})
        }
            const passCompare=await bcrypt.compare(password,user.password)
            
            if(!passCompare){
                success=false
                return res.status(400).json({error:"Please login with correct credientials"})
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_SECRET)
            res.json({success,authtoken})
        }
        catch(error){
            console.error("Some intrnal eroor occured")
        }
    })

    //Route 3:Get user detail using post:Login Required
    router.post('/getuser',fetchuser,async(req,res)=>{
        
        try {
            let userId=req.user.id
            const user=await User.findById(userId).select('-password')
            res.send(user)
            
        } catch (error) {
            
        }
    })
module.exports = router;

