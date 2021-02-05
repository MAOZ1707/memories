const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	albumId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Albums",
	},
});

const Images = mongoose.model("Images", imagesSchema);

module.exports = Images;
