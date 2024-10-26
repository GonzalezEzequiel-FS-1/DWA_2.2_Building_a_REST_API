const express = require("express");
const passport = require("passport");
const { signup, signin } = require("../controller/authenticationController");


const requireLogin = passport.authenticate("local", { session: false }); // Use 'local'

const router = express.Router();

// Test route to verify authentication setup
router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth Route works",
    });
});

// Sign up route
router.post("/signup", signup);

// Sign in route with Passport local strategy
router.post("/signin", requireLogin, signin);

module.exports = router;
