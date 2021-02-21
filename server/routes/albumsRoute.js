const express = require('express');

const { body } = require('express-validator');

const checkAuth = require('../middleware/checkAuth');

const albumsController = require('../controller/albumsController');

const router = express.Router();

router.use(checkAuth);

router
	.route('/user/:id')
	.get(albumsController.getAlbumsByUserId)
	.delete(albumsController.deleteAllAlbumsByUserId);

router
	.route('/')
	.post(
		body('title').notEmpty().isString(),
		body('address').notEmpty().isString(),
		albumsController.createAlbums
	);

router
	.route('/:id')
	.get(albumsController.getAlbumById)
	.patch(
		body('title').notEmpty().isString(),
		body('description').notEmpty().isString(),
		albumsController.updateAlbumById
	)
	.delete(albumsController.deleteAlbumAndImagesById);

router.route('/:id/like-album').patch(albumsController.likeAlbum);

module.exports = router;
