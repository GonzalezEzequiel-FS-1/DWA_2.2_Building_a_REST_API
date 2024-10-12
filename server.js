// Load Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");

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
app.use("/", routes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Exit process to ensure app crashes on critical issues
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);  
});