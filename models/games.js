const mongoose = require("mongoose");
const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Shooter', 'Fighting', 'Platformer', 'Puzzle', 'Racing', 'Maze', 'Action RPG', 'Strategy', 'Run-and-gun', 'Beat \'em up', 'Interactive Movie', 'Action', 'Sports', 'Rhythm', 'Action-adventure', 'Survival horror', 'First-person shooter', 'RPG'],
        required: true
    },
    release_year: {
        type: Number,
        required: true,
    },
    platform: {
        type: String,
        enum: [
            // First to Third Generation Consoles
            'Magnavox Odyssey', 'Atari 2600', 'ColecoVision', 'Intellivision',
            'Atari 5200', 'Atari 7800', 'NES', 'Sega Master System',
            // Fourth Generation (16-bit era)
            'SNES', 'Sega Genesis', 'TurboGrafx-16', 'Neo Geo',
            // Fifth Generation (32-bit/64-bit era)
            'PlayStation', 'Nintendo 64', 'Sega Saturn', 'Atari Jaguar',
            // Sixth Generation (128-bit era)
            'PlayStation 2', 'GameCube', 'Xbox', 'Dreamcast',
            // Seventh Generation (HD era)
            'Xbox 360', 'PlayStation 3', 'Wii',
            // Eighth Generation (Current Gen before next-gen)
            'PlayStation 4', 'Xbox One', 'Wii U', 'Nintendo Switch',
            // Ninth Generation (Next-Gen)
            'PlayStation 5', 'Xbox Series X', 'Xbox Series S',
            // Handhelds
            'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'Nintendo DS', 'Nintendo 3DS', 'PlayStation Portable', 'PlayStation Vita',
            // PC and Arcade
            'PC', 'Arcade'
        ],
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    }
    
})

module.exports = mongoose.model("Game", gamesSchema)