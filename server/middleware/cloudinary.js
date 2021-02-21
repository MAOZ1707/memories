const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'maoz',
	api_key: '515835465683911',
	api_secret: 'Icp5wvW8MSDq7D8YUr6Ga1E3Zuc',
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'memories/images',
		allowedFormats: ['jpg', 'jpeg', 'png', 'mp4', 'mov'],
		type: 'authenticated',
	},
});

const parser = multer({ storage: storage });
module.exports = parser;
