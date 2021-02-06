const Albums = require("../model/albumsSchema");
const User = require("../model/usersSchema");
// const Image = require('')
const AppError = require("../utils/appError");
const getCoordsForAddress = require("../utils/location");

exports.getAlbumsByUserId = async (req, res, next) => {
	const userId = req.params.id;

	let existingUser;
	try {
		existingUser = await User.findById(userId);
	} catch (error) {
		return next(
			new AppError("Fetching user failed, please try again later.", 404)
		);
	}

	if (!existingUser) {
		return next(new AppError("Could not find user for provided id", 404));
	}

	let userAlbums;
	try {
		userAlbums = await Albums.find({ creator: userId });
	} catch (error) {
		return new AppError("Fetching user failed, please try again later.", 404);
	}

	if (!userAlbums || userAlbums.length === 0) {
		return new AppError(
			"Could not find user albums for the provided user id",
			404
		);
	}

	res.status(200).json({
		albums: userAlbums,
	});
};

exports.getAlbumById = async (req, res, next) => {
	const albumId = req.params.id;

	console.log(albumId);

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(
			new AppError("Fetching album failed, please try again later", 401)
		);
	}

	if (!album) {
		return next(new AppError("Could not find album for provided id", 404));
	}

	res.status(200).json({
		album,
	});
};

exports.createAlbums = async (req, res, next) => {
	console.log(req.body);

	let user;

	try {
		user = await User.findById(req.body.creator);
	} catch (error) {
		return next(
			new AppError("Fetching album failed, please try again later", 500)
		);
	}

	if (!user) {
		return next(new AppError("Could not find user for provided id", 404));
	}

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(req.body.address);
	} catch (error) {
		return next(error);
	}

	try {
		const newAlbum = await Albums.create({
			title: req.body.title,
			description: req.body.description,
			address: req.body.address,
			location: coordinates,
			creator: req.body.creator,
		});

		res.status(200).json({
			album: newAlbum,
		});
	} catch (error) {
		return next(
			new AppError("Could not create album, please check your credentials", 404)
		);
	}
};

exports.updateAlbumById = async (req, res, next) => {
	const albumId = req.params.id;

	console.log(albumId);

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(new AppError("Something went wrong, could not update album"));
	}

	if (!album) {
		return next(new AppError("Could not find album for provided id"));
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
		return new AppError("Something went wrong, could not update album", 401);
	}
};

exports.deleteAlbumAndImagesById = async (req, res, next) => {
	const albumId = req.params.id;

	console.log(albumId);

	let album;
	try {
		album = await Albums.findById(albumId);
	} catch (error) {
		return next(new AppError("Something went wrong, could not find album"));
	}

	if (!album) {
		return next(new AppError("Could not find album for provided id"));
	}

	try {
		await Albums.findByIdAndDelete(albumId);
		await Images.findByIdAndDelete({ albumId: albumId });
	} catch (error) {
		return next(new AppError("Something went wrong when, cannot delete album"));
	}
};

exports.deleteAllAlbumsByUserId = async (req, res, next) => {};
