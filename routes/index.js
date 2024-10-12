const express = require("express");
const router = express.Router();

// Import the controller
const { 
  addGame,
  getGame,
  deleteGame,
  deleteAllGames,
  editGame } = require("../controller/gamesRoutes"); // Fix import to match the file name

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
router.post("/games", addGame);
router.get("/games/:id", getGame)
router.delete("/games/:id", deleteGame)
router.delete("/games/deleteall", deleteAllGames)
router.patch("/games/:id", editGame)


module.exports = router;
