const express = require("express");
const router = express.Router()
const authController = require('../controller/authenticationController');

router.get("/test", (req, res)=>{
    res.status(200).json({
        success:true,
        message:`Auth Route works`
    })
})
router.post("/signup", authController.signup)

module.exports = router;