// Load Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth')
const userRoutes = require('./controller/userRoutes')

//Setup Passport:
const passport = require("passport");
require("./services/passport");

// Start Express
const app = express();

// Load DotEnv
dotEnv.config();

// Set environmental variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Check for required environment variables
if (!DATABASE_URL) {
    console.error("Missing DATABASE_URL in environment variables");
    process.exit(1);
}

// Connect to MongoDB Database
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', error => {
    console.error("Database connection error:", error);
});
db.once('open', () => {
    console.log('Database Connected');
});

// Load Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Routes
const routes = require("./routes");
app.use("/api/v1", routes);

//Set Auth Routes
app.use("/auth", authRoutes)
// Build Vite App
app.use(express.static(path.join(__dirname, `../vite/dist`)))
//Set User Routes
app.use("/users", userRoutes)

// Assume routes not in server are coming for the front end
app.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname,"../vite/dist"))
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Exit process to ensure app crashes on critical issues
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);  
});