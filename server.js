// Load Dependencies
const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");

// Start Express
const app = express();

// Load DotEnv
dotEnv.config();

// Load Middleware
app.use(cors());

// Set environmental variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Connect DB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection; 
db.on('error', error => console.error(error));
db.once('open', () => console.log('Database Connected'));

// Set Routes
const routes = require("./routes");
app.use("/", routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); 
});
