const express = require('express');

const { body } = require('express-validator');

const imagesController = require('../controller/imageController');

const checkAuth = require('../middleware/checkAuth');

const parser = require('../middleware/cloudinary');

const router = express.Router();

router.use(checkAuth);

router
	.route('/album/:id')
	.get(imagesController.getImagesByAlbumId)
	.delete(imagesController.deleteAllImages)
	.post(parser.array('imageUrl'), imagesController.uploadImages);

router
	.route('/')
	.post(body('imageUrl').notEmpty().isString(), imagesController.createImages);

router
	.route('/:id')
	.get(imagesController.getImageById)
	.delete(imagesController.deleteImageById);

module.exports = router;
