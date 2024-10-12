const express = require("express");
const router = express.Router();
const { getGameMiddleware } = require("../middlewares/middlewares");

// Import the controller
const { 
  addGame,
  getGame,
  deleteGame,
  deleteAllGames,
  editGame, 
  getAllGames,
  addManyGames
} = require("../controller/gamesRoutes");

// Home route
router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: `API Responding!`
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message}`
    });
  }
});

// Games routes

// Add Single Game
router.post("/games", addGame); // This handles adding a single game

// Add Multiple Games (Bulk Upload)
router.post("/games/bulk", addManyGames);

// Get Game by ID
router.get("/games/:id", getGameMiddleware, getGame);

// Get All Games
router.get("/games", getAllGames);

// Delete Game by ID
router.delete("/games/:id", getGameMiddleware, deleteGame);

// Delete All Games
router.delete("/games", deleteAllGames);

// Edit Game by ID
router.patch("/games/:id", getGameMiddleware, editGame);

module.exports = router;
