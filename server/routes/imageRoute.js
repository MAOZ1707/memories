const express = require("express");

const imagesController = require("../controller/imageController");

const router = express.Router();

// router
// 	.route("/album/:id")
// 	.get(imagesController.getImagesByAlbumId)
// 	.delete(imagesController.deleteImagesByAlbumId);

// router.route("/").post(imagesController.createImages);

// router
// 	.route("/:id")
// 	.get(imagesController.getImageById)
// 	.patch(imagesController.updateImageById)
// 	.delete(imagesController.deleteImageById);

module.exports = router;
