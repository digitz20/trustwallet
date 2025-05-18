const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        lowercase: true
    }

},{timestamps: true})

const userModel = mongoose.model('users',userSchema)


module.exports = userModel;