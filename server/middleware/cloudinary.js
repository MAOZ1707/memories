const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

//Todo --> make this with dotEnv!

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'memories/images',
		allowedFormats: ['jpg', 'jpeg', 'png'],
		type: 'authenticated',
	},
});

const parser = multer({ storage: storage });
module.exports = parser;
