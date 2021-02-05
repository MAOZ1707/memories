const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const chalk = require("chalk");

const app = express();

const AppError = require("./utils/appError");

const usersRouter = require("./routes/usersRoute");
const albumsRouter = require("./routes/albumsRoute");
// const imagesRouter = require("./routes/imageRoute");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Route
app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
// app.use("/api/images", imagesRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.log(chalk.redBright(err.stack));

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

module.exports = app;
