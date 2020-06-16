const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// new user that registers on our site
const userSchema = new Schema({
    email: String,
    password: String
})
const User = mongoose.model('user', userSchema);


// new user that registers with google
const googleSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    googleId: String,
    profilePic: String
})
const GoogleUser = mongoose.model('googleUser', googleSchema);


// export our user schemas
module.exports = {
    User,
    GoogleUser
}