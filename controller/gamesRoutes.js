const mongoose = require("mongoose");
const Game = require("../models/games")
// Add One Game
const addGame = async (req, res) => {
   if (!req.body.title || !req.body.genre || !req.body.release_year || !req.body.platform) {
        return res.status(400).json({
            success: false,
            message: "Game data not provided. Required fields: title, genre, release_year, platform."
        });
    }
    
    const game = new Game({
        title: req.body.title,
        genre: req.body.genre,
        release_year: req.body.release_year,
        platform: req.body.platform,
        rating: req.body.rating
    });

    try {
        const newGame = await game.save();
        return res.status(201).json({
            success: true,
            data: newGame
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: `Validation failed: ${error.message}`
            });
        }
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`
        });
    }
};


// Get One Game
const getGame = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: `${req.method} failed, ID not provided`
        })
    }
    try {
        return res.status(200).json({
            success: true,
            message: `Get id ${id} worked`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult error >>> ${error}`
        })
    }
}


//Delete One Game
const deleteGame = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(422).json({
            success: false,
            message: `${req.method} failed, no ID provided`
        })
    }
    try {
        return res.status(200).json({
            success: true,
            message: `Game with ID ${id} deleted`
        })
    } catch (error) {
        return res.status(500).json({
            success: failed,
            message: `${req.method} failed, consult error >>> ${error}`
        })
    }
}

//Delete Database
const deleteAllGames = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: `All items on database deleted`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult error >>> ${error}`
        })
    }
}

// Edit One Game
const editGame = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(422).json({
            success: false,
            message: `${req.method} failed, no ID provided`
        })
    }
    try {
        return res.status(200).json({
            success: true,
            message: `Game with ID ${id} edited`
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult error >>> ${error}`
        }) 
    }
}
module.exports = {
    addGame,
    getGame,
    deleteGame,
    deleteAllGames,
    editGame
};