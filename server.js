const express = require("express");
const app = express();
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
