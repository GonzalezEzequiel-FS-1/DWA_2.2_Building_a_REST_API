const express = require("express");
const mongoose = require("mongoose")
const app = express();
const path = require("path");
const dotEnv = require("dotenv");
dotEnv.config();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
