const express = require("express");

const albumsController = require("../controller/albumsController");

const router = express.Router();

router
	.route("/user/:id")
	.get(albumsController.getAlbumsByUserId)
	.delete(albumsController.deleteAllAlbumsByUserId);

router.route("/").post(albumsController.createAlbums);

router
	.route("/:id")
	.get(albumsController.getAlbumById)
	.patch(albumsController.updateAlbumById)
	.delete(albumsController.deleteAlbumAndImagesById);

module.exports = router;
