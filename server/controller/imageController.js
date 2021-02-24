const { validationResult } = require('express-validator');
const Albums = require('../model/albumsSchema');
const Images = require('../model/imagesSchema');
const AppError = require('../utils/appError');

exports.getImagesByAlbumId = async (req, res, next) => {
	const albumId = req.params.id;

	let existingAlbum;
	try {
		existingAlbum = await Albums.findById(albumId);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later.', 404)
		);
	}

	if (!existingAlbum) {
		return next(new AppError('Could not find album for provided id', 404));
	}

	let albumImages;
	try {
		albumImages = await Images.find({ albumId: albumId });
	} catch (error) {
		return new AppError('Fetching user failed, please try again later.', 404);
	}

	if (!albumImages || albumImages.length === 0) {
		return new AppError('Could not find images for the this album', 404);
	}

	res.status(200).json({
		images: albumImages,
	});
};

exports.getImageById = async (req, res, next) => {
	const imageId = req.params.id;

	let image;
	try {
		image = await Images.findById(imageId);
	} catch (error) {
		return next(
			new AppError('Fetching image failed, please try again later', 401)
		);
	}

	if (!image) {
		return next(new AppError('Could not find image ', 404));
	}

	res.status(200).json({
		image,
	});
};

exports.createImages = async (req, res, next) => {
	let album;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(
			new AppError('Invalid inputs passed, please check your data.', 400)
		);
	}

	try {
		album = await Albums.findById(req.body.albumId);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later', 500)
		);
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id', 404));
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(new AppError('You dont have permission to create image', 401));
	}

	try {
		const newImage = await Images.create({
			imageUrl: req.body.imageUrl,
			albumId: req.body.albumId,
		});

		res.status(200).json({
			image: newImage,
		});
	} catch (error) {
		return next(
			new AppError('Could not create image, please check your credentials', 404)
		);
	}
};

exports.deleteAllImages = async (req, res, next) => {
	const albumId = req.params.id;

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later', 500)
		);
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id', 404));
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(
			new AppError('You dont have permission to delete this album', 401)
		);
	}

	try {
		await Images.deleteMany({ albumId: albumId });

		res.status(200).json({
			images: null,
		});
	} catch (error) {
		return next(
			new AppError('Something went wrong, Could not delete images', 404)
		);
	}
};
exports.deleteImageById = async (req, res, next) => {
	const imageId = req.params.id;

	let album;
	try {
		const image = await Images.findById(imageId);
		album = await Albums.findById(image.albumId);
	} catch (error) {
		return next(
			new AppError('Something went wrong, Could not find images', 404)
		);
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(
			new AppError('You dont have permission to delete this image', 401)
		);
	}

	try {
		await Images.findByIdAndDelete(imageId);
		res.status(200).json({
			image: null,
		});
	} catch (error) {
		return next(
			new AppError('Something went wrong, Could not find images', 404)
		);
	}
};

exports.likeImage = async (req, res, next) => {
	const imageId = req.params.id;
	console.log(imageId);

	let image;
	try {
		image = await Images.findById(imageId);
	} catch (error) {
		return next(new AppError('Something went wrong, please try later.'), 500);
	}

	if (!image) {
		return next(new AppError('Could not find album!'), 404);
	}
	console.log(image._id);
	// 2- toggle the current state   false->true, true->false

	try {
		const toggleLike = await Images.findByIdAndUpdate(
			imageId,
			{ like: !image.like },
			{
				new: true,
			}
		);

		res.status(200).json({
			image: toggleLike,
		});
	} catch (error) {
		return next(
			new AppError('Could not update this album, please try agin later'),
			400
		);
	}
};

exports.uploadImages = async (req, res, next) => {
	const albumId = req.params.id;

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later', 500)
		);
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id', 404));
	}

	let images;
	try {
		images = await req.files;
	} catch (error) {
		return next(
			new AppError('Something went wrong, pleas try again late', 500)
		);
	}

	if (!images || images.length === 0) {
		return next(new AppError('please upload image/s'));
	}

	try {
		images.forEach(async (img) => {
			const testImage = await Images.create({
				imageUrl: img.path,
				albumId: albumId,
				like: false,
			});

			return res.status(200).json({ image: testImage });
		});
	} catch (error) {
		return next(new AppError('loop fail'));
	}
};
