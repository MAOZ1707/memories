const express = require('express')
const cors = require('cors')

const app = express()

const { body } = require('express-validator')

const checkAuth = require('../middleware/checkAuth')

const albumsController = require('../controller/albumsController')

const uploadS3 = require('../middleware/multer')

const router = express.Router()

router.use(checkAuth)

router
	.route('/user/:id')
	.get(albumsController.getAlbumsByUserId)
	.delete(albumsController.deleteAllAlbumsByUserId)

router
	.route('/')
	.post(
		body('title').notEmpty().isString(),
		body('address').notEmpty().isString(),
		uploadS3.single('image'),
		albumsController.createAlbums
	)

app.options('/:id', cors())
router
	.route('/:id')
	.get(albumsController.getAlbumById)
	.put(
		body('title').notEmpty().isString(),
		body('description').notEmpty().isString(),
		cors(),
		albumsController.updateAlbumById
	)
	.delete(albumsController.deleteAlbumAndImagesById)

app.options('/:id/like-album', cors())
router.route('/:id/like-album').put(cors(), albumsController.likeAlbum)

module.exports = router
