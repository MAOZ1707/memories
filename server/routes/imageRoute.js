const express = require("express");

const imagesController = require("../controller/imageController");

const router = express.Router();

router
	.route("/album/:id")
	.get(imagesController.getImagesByAlbumId)
	.delete(imagesController.deleteAllImages);

router.route("/").post(imagesController.createImages);

router
	.route("/:id")
	.get(imagesController.getImageById)
	.delete(imagesController.deleteImageById);

module.exports = router;
