const express = require("express");

const albumsController = require("");

const router = express.Router();

router
	.route("/user/:id")
	.get(albumsController.getAlbumsByUserId)
	.delete(albumsController.deleteAlbumsByUserId);

router.route("/").post(albumsController.createAlbums);

router
	.route("/:id")
	.get(albumsController.getAlbumById)
	.patch(albumsController.updateAlbumById)
	.delete(albumsController.deleteAlbumAndImagesById);

module.exports = router;
