const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

//Todo --> make this with dotEnv!

cloudinary.config({
	cloud_name: 'maoz',
	api_key: '515835465683911',
	api_secret: 'Icp5wvW8MSDq7D8YUr6Ga1E3Zuc',
});

//!

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
