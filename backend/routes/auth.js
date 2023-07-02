const express = require('express');
const router = express.Router();
const User = require('../models/users')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const encoder = bodyparser.urlencoded();
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'mysecret';
// --->later
const {body, validationResult} = require('express-validator');

// User.find().then((users)=>{
//         console.log(users)
//     })

//creating a use at endpoint /api/auth
    
router.post('/',encoder,[
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail()
], async (req, res)=>{
    let success = false;
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        let data = await  User.findOne({ email: req.body.email});
        if(data){
            return res.status(400).json({ error: "use another credentials for sign up"})
        }
    
        //we'll secure password
        const salt = await bcrypt.genSalt(10);
        const secpas = await bcrypt.hash(req.body.password , salt);
    
        data =new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: secpas,
        });
    
        data.save().then((result)=>{
         console.warn(result)
        })
        .catch(err=>console.warn(err))
    
        const d1 = {
            data:{
                id: data.id
            }
        }
        const authtoken = jwt.sign(d1,JWT_SECRET)
        success = true;
        res.json({success,authtoken})
    } catch (error) {
        console.error(error);
       res.status(500).send("problem")
    }
    //res.json({"Nice": "nice"})
})

//Authenticate a user
router.post('/login', encoder, async(req, res)=>{
    const {email, password} = req.body;
    let success = false
    try{
       let user = await User.findOne({email});
       if(!user){
        success=false
        return res.status(400).json({err: "Try to login with correct credentials"})
       }
       const passwordCompare = await bcrypt.compare(password, user.password)
       if(!passwordCompare){
        return res.status(400).json({err: "Try to login with correct credentials"})
       }
       const d3 = {
        user:{
            id: user.id
        }   
    }
    const authtoken = jwt.sign(d3,JWT_SECRET)
    success=true
    res.json({success,authtoken})
    }
    catch(err){
       console.error(err);
       res.status(500).send("problem")
    }
})
 

// i'll create a fetchuser named middleware which will basically fetch the details of
// the user that tried to logged in and i can use this middleware whereever i want to use it.

router.post('/getuser', encoder,fetchuser, async(req, res)=>{
try { 
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (err) {
    console.error(err);
       res.status(500).send("problem")
}

})

// router.post('/', async (req,res) => {
//     console.log(req.body);
//     const user = User(req.body);
//     await user.save()
//     res.send(req.body)
// })

module.exports = router