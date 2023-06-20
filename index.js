const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { pool } = require("./src/config/pg_connection");
const { setPgTypes } = require("./src/helper/pg_types");
const { errorHandler } = require("./src/middlewares/error_middlware");
const { log_middleware } = require("./src/middlewares/log_middlware");
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
app.use(log_middleware);
app.use(cors())

app.use(bodyParser.json());
app.use("/stock",api_router);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server Listening At :${SERVER_PORT}`);
});
});
