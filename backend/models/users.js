const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String
});
module.exports = mongoose.model('User',UserSchema)