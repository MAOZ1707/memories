const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const usersRouter = require("./routes/usersRoute");
const albumsRouter = require("./routes/albumsRoute");
const imagesRouter = require("./routes/imageRoute");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Route
app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/images", imagesRouter);

module.exports = app;
