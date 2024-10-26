const mongoose = require('mongoose');
const validateEmail = require("../utils/validateEmail");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    newUser: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "Email Address is required",
        lowercase: true,
        unique: true,
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

// Hashing and Salting Password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew || user.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if (error) {
            return callback(error);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
