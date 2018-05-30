const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
var user

// Define our user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Execute before each user.save() call
UserSchema.pre('save', callback => {
    user = this
    // Hash password
    bcrypt.genSalt(5, (error, salt) => {
        if (error) return callback(error)
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            if (error) return callback(error)
            user.password = hash
            callback()
        })
    })
})

UserSchema.methods.validPassword = password => {
    bcrypt.compare(password, user.password, (error, response) => {
        console.log(user, user.password, password)
        if (error) { return false}
        return true
    })
}

module.exports = mongoose.model('User', UserSchema)