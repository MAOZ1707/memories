/* eslint-disable node/no-unsupported-features/es-syntax */
const { validationResult } = require('express-validator');
const moment = require('moment'); // require
const Albums = require('../model/albumsSchema');
const User = require('../model/usersSchema');
const AppError = require('../utils/appError');
const getCoordsForAddress = require('../utils/location');

exports.getAlbumsByUserId = async (req, res, next) => {
	const userId = req.params.id;

	//---------------------

	let existingUser;
	try {
		existingUser = await User.findById(userId);
	} catch (error) {
		return next(
			new AppError('Fetching user failed, please try again later.', 404)
		);
	}

	if (!existingUser) {
		return next(new AppError('Could not find user for provided id', 404));
	}

	let userAlbums;
	console.log(existingUser._id);
	try {
		userAlbums = await Albums.find({ creator: existingUser._id });
		console.log(userAlbums);
		if (userAlbums.length === 0) {
			return next(
				new AppError('Could not find user albums for the provided user id', 404)
			);
		}

		let searchText = {};
		if (req.query.title) {
			const text = req.query.title;
			searchText = { title: { $regex: text }, creator: userId };
		}
		if (req.query.like) {
			searchText = { ...req.query, creator: userId };
		}

		const query = Albums.find(searchText).sort(`-createAt`);

		userAlbums = await query;
		if (userAlbums.length === 0) {
			return next(new AppError('Could not find albums', 404));
		}
	} catch (error) {
		return new AppError('Fetching user failed, please try again later.', 404);
	}

	if (!userAlbums || userAlbums.length === 0) {
		return new AppError(
			'Could not find user albums for the provided user id',
			404
		);
	}

	res.status(200).json({
		albums: userAlbums,
	});
};

exports.getAlbumById = async (req, res, next) => {
	const albumId = req.params.id;

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later', 401)
		);
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id', 404));
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(
			new AppError('You dont have permission to get this album', 401)
		);
	}

	res.status(200).json({
		album,
	});
};

exports.createAlbums = async (req, res, next) => {
	let user;
	try {
		user = await User.findById(req.body.creator);
	} catch (error) {
		return next(
			new AppError('Fetching album failed, please try again later', 500)
		);
	}

	if (!user) {
		return next(new AppError('Could not find user for provided id', 404));
	}

	if (req.user._id.toString() !== user._id.toString()) {
		return next(
			new AppError('You dont have permission to create this album', 401)
		);
	}

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(req.body.address);
	} catch (error) {
		return next(error);
	}

	let imageFile;
	try {
		imageFile = req.file.location;
	} catch (error) {
		return next(
			new AppError('Something went wrong, please try again later.', 500)
		);
	}

	if (!imageFile) {
		return next(new AppError('Peak image is required', 401));
	}

	try {
		const newAlbum = await Albums.create({
			title: req.body.title,
			description: req.body.description,
			address: req.body.address,
			location: coordinates,
			image: imageFile,
			createAt: moment().locale('en-au').format('L'),
			creator: req.body.creator,
		});

		res.status(200).json({
			album: newAlbum,
		});
	} catch (error) {
		return next(
			new AppError('Could not create album, please check your credentials', 404)
		);
	}
};

exports.updateAlbumById = async (req, res, next) => {
	const albumId = req.params.id;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new AppError('Invalid inputs passed, please check your data.', 400)
		);
	}

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(new AppError('Something went wrong, could not update album'));
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id'));
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(
			new AppError('You dont have permission to update this album', 401)
		);
	}

	try {
		const updates = {
			title: req.body.title,
			description: req.body.description,
		};

		const updateAlbum = await Albums.findByIdAndUpdate(albumId, updates, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			album: updateAlbum,
		});
	} catch (error) {
		return new AppError('Something went wrong, could not update album', 401);
	}
};

exports.deleteAlbumAndImagesById = async (req, res, next) => {
	const albumId = req.params.id;

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(new AppError('Something went wrong, could not find album'));
	}

	if (!album) {
		return next(new AppError('Could not find album for provided id'));
	}

	if (req.user._id.toString() !== album.creator.toString()) {
		return next(
			new AppError('You dont have permission to delete this album', 401)
		);
	}

	try {
		await Albums.findByIdAndDelete(albumId);
		// await Images.findByIdAndDelete({ albumId: albumId });
		res.status(200).json({ message: 'Deleted album.' });
	} catch (error) {
		return next(
			new AppError('Something went wrong when, cannot delete album'),
			500
		);
	}
};

exports.likeAlbum = async (req, res, next) => {
	const albumId = req.params.id;
	// 1- find album
	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(new AppError('Something went wrong, please try later.'), 500);
	}

	if (!album) {
		return next(new AppError('Could not find album!'), 404);
	}
	// 2- toggle the current state   false->true, true->false

	try {
		const toggleLike = await Albums.findByIdAndUpdate(
			albumId,
			{ like: !album.like },
			{
				new: true,
			}
		);

		res.status(200).json({
			album: toggleLike,
		});
	} catch (error) {
		return next(
			new AppError('Could not update this album, please try agin later'),
			400
		);
	}
};

exports.deleteAllAlbumsByUserId = async (req, res, next) => {};
