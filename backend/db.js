// const express = require('express')
// const db = express();
const mongoose = require('mongoose');
require('dotenv').config();

//const User = require('./models/users')
mongoose.set('strictQuery', false);

const connectToMongo=()=>{
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // User.find().then((users)=>{
    //     console.log(users)
    // })
 }
module.exports = connectToMongo;
    // User.find().then((users)=>{
    //     console.log(users)
    // })
    // const data = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: "Jahnvi",
    //     email: "jahnvi@gmail.com",
    //     address: "jagdeshnagar"
    // });

    // data.save().then((result)=>{
    //  console.warn(result)
    // })
    // .catch(err=>console.warn(err))
//mongodb+srv://882ankitasriastava:<password>@cluster0.w8b40q4.mongodb.net/?retryWrites=true&w=majoritye