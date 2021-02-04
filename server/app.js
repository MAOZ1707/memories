const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

module.exports = app;
