const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password can not include word \"password\"")
            }
        }
    },
    profileImageUrl: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User