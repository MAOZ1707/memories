/* eslint-disable no-useless-escape */
const express = require('express');

const { body } = require('express-validator');

const imagesController = require('../controller/imageController');

const uploadS3 = require('../middleware/multer');

const checkAuth = require('../middleware/checkAuth');

// const parser = require('../middleware/cloudinary');

const router = express.Router();

router.use(checkAuth);
router
	.route('/album/:id')
	.get(imagesController.getImagesByAlbumId)
	.delete(imagesController.deleteAllImages);

router
	.route('/')
	.post(body('imageUrl').notEmpty().isString(), imagesController.createImages);

router
	.route('/:id')
	.get(imagesController.getImageById)
	.delete(imagesController.deleteImageById);

router.route('/:id/like-image').patch(imagesController.likeImage);

router.route('/:id/studio').patch(imagesController.addImageStyle);

router
	.route('/album/:id/upload')
	.post(uploadS3.array('image', 4), imagesController.uploadImages);

module.exports = router;
