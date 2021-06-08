/* eslint-disable no-useless-escape */
const express = require('express')

const cors = require('cors')

const app = express()

const { body } = require('express-validator')

const imagesController = require('../controller/imageController')

const uploadS3 = require('../middleware/multer')

const checkAuth = require('../middleware/checkAuth')

const router = express.Router()

router.use(checkAuth)
router
	.route('/album/:id')
	.get(imagesController.getImagesByAlbumId)
	.delete(imagesController.deleteAllImages)

router
	.route('/')
	.post(body('imageUrl').notEmpty().isString(), imagesController.createImages)

router
	.route('/:id')
	.get(imagesController.getImageById)
	.delete(imagesController.deleteImageById)

app.options('/:id/like-image', cors())
router.route('/:id/like-image').put(cors(), imagesController.likeImage)

app.options('/:id/studio', cors())
router.route('/:id/studio').put(cors(), imagesController.addImageStyle)

router
	.route('/album/:id/upload')
	.post(uploadS3.array('image', 4), imagesController.uploadImages)

module.exports = router
