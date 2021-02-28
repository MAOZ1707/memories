const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
	imageUrl: {
		type: String,
	},
	like: {
		type: Boolean,
		default: false,
	},
	filters: {
		type: Object,
	},
	albumId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Albums',
	},
});

const Images = mongoose.model('Images', imagesSchema);

module.exports = Images;
