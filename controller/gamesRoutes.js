const mongoose = require("mongoose");
const Game = require("../models/games");

// Add One Game WORKING
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

// Bulk Upload
const addManyGames = async (req, res) => {
    const games = req.body;
    if(!Array.isArray(games) || games.length === 0 ){
        return res.status(422).json({
            success:false,
            message:`Data not in array form or no data submitted`
        })
    }
    for(const game of games){
        if (!game.title || !game.genre || !game.release_year || !game.platform) {
            return res.status(422).json({
                success: false,
                message: "Game data not provided. Required fields: title, genre, release_year, platform."
            });
        }
    }
    try {
        const addedGames = await Game.insertMany(games);
        return res.status(200).json({
            success:true,
            data:addedGames
        })

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

//Get ALL Games WORKING
const getAllGames = async (req, res)=>{
    const students = await Game.find();
    try {
        return res.status(200).json({
            success:true,
            data:students
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`${req.method} failed. consult error >>> ${error.message}`
        })
    }
}

// Get One Game WORKING
const getGame = async (req, res) => {
    const game = req.game;

    return res.status(200).json({
        success: true,
        data: game
    });
};

// Delete One Game WORKING
const deleteGame = async (req, res) => {
    const id = req.params.id;

    try {
        const game = await Game.findByIdAndDelete(id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: `Game with ID ${id} not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Game with ID ${id} deleted`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult error >>> ${error}`
        });
    }
};

// Delete All Games 
const deleteAllGames = async (req, res) => {
    try {
        const result = await Game.deleteMany({});
        return res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} games from the database`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `DELETE ALL failed, consult error >>> ${error.message}`
        });
    }
};


// Edit One Game WORKING
const editGame = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({
                success: false,
                message: `Game with ID ${id} not found`
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedGame
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult error >>> ${error}`
        });
    }
};

module.exports = {
    addGame,
    getGame,
    deleteGame,
    deleteAllGames,
    editGame,
    getAllGames,
    addManyGames

};
