const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { pool } = require("./src/config/pg_connection");
const { setPgTypes } = require("./src/helper/pg_types");
const { api_router } = require("./src/routes/routes");
const cors = require("cors");

// Config Env
require("dotenv").config();
/* Set PG Types , So, Integer will not be string */
setPgTypes();
// Connect PG Connection
pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const SERVER_PORT = process.env.SERVER_PORT || 8000;
  app.use(cors())

  app.use(bodyParser.json());
  app.use("/api",api_router);

  app.listen(SERVER_PORT, () => {
    console.log(`Server Listening At :${SERVER_PORT}`);
  });
});
