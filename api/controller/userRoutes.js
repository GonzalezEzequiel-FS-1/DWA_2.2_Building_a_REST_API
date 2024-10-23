const express = require("express");
const passport = require('passport');
//const passportService = require('../services/passport');
const User = require('../models/user');

const protectedRoute = passport.authenticate('jwt', {
    session: false,
});
const router = express.Router();

// Middleware to get user by ID
const getUser = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found`
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `${req.method} failed, consult error >> ${error.message}`
        });
    }
    
    req.user = user;
    next();
};

// Route to get all users (protected)
router.get("/", protectedRoute, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `${req.method} failed, consult >> ${error.message}`
        });
    }
});

// Get a specific user by ID
router.get("/:id", protectedRoute, getUser, (req, res) => {
    
    res.status(200).json({
        success: true,
        data: req.user
    });
});

module.exports = router;
