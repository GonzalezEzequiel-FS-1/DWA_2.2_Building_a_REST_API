const mongoose = require("mongoose");
const Game = require("../models/games")
const getGameMiddleware = async (req, res, next) => {
    let game;
    try {
        game = await Game.findById(req.params.id)
        if (game === null) {
            return res.status(404).json({
                success: false,
                message: `${req.method} failed, game not found`
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    req.game = game;
            next();
}
module.exports = {
    getGameMiddleware
}