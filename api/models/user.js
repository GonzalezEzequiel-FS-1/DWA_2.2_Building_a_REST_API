const mongoose = require('mongoose');
const validateEmail = require("../utils/validateEmail")
const bcrypt = require("bcrypt-nodejs")
const userSchema = new mongoose.Schema({
    newUser: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: "Email Address is required",
        lowercase: true,
        validate: [validateEmail, "Email Invalid"]

    },
    password: {
        type: String,
        required: "Password is required",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    }

});

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isNew || user.isModified("password")) {
        //Run Hashing and Salting
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return next(error)
            }
            bcrypt.hash(user.password, salt, null, (error, hash) => {
                if (error) {
                    return next(error)
                }
                user.password = hash;
                next();
            })
        })

    } else {
        //Skip Hashing and Salting
        next()
    }
})

module.exports = mongoose.model('User', userSchema);
