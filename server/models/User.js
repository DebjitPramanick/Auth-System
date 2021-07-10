const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String, 
    age: Number,
    accessToken: String,
    refreshToken: String,
    accessTokenExp: String,
    refreshTokenExp: String
})

module.exports = new mongoose.model('User', UserSchema)