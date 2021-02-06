const mongoose = require("mongoose");

const albumsSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, "title name is required"],
	},
	address: { type: String, required: true },
	description: {
		type: String,
		trim: true,
	},
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	createAt: {
		type: String,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

const Albums = mongoose.model("Albums", albumsSchema);

module.exports = Albums;
