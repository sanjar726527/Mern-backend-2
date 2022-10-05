const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    verified: {
        type: Boolean
    }
},{timestamps:true})



module.exports = mongoose.model('User', userSchema)

