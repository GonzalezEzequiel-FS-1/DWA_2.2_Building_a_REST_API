const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success:true,
      message:`API Responding!`
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`${req.method} failed, consult error >>> ${error}`
    });
  }
});

module.exports = router;