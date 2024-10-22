const User = require("../models/user");
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
};

const signup = async (req, res, next) => {
    const { newUser, email, password } = req.body;

    if (!email) {
        return res.status(422).json({
            success: false,
            error: `Please provide an email`
        });
    }
    if (!password) {
        return res.status(422).json({
            success: false,
            error: `Please provide a password`
        });
    }
    if (!newUser) {
        return res.status(422).json({
            success: false,
            error: `Please provide a user name`
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(422).json({
                success: false,
                error: `Email already registered`
            });
        }

        const user = new User({newUser, email, password });

        await user.save();

        res.status(200).json({
            user_id: user._id,
            token: tokenForUser(user),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup
};
