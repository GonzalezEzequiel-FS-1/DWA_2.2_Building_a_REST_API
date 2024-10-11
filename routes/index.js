const express = require("express");
const router = express.Router();

// Import the controller
const { addGames, getOne } = require("../controller/gamesRoutes"); // Fix import to match the file name

// Home route
router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: `API Responding!`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${req.method} failed, consult error >>> ${error}`
    });
  }
});

// Games route
router.post("/games", addGames);
router.get("/games/:id", getOne)


module.exports = router;
