const User = require('../model/usersSchema');
const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (error) {
		return next(new AppError('can not find users', 404));
	}

	if (!users) {
		return next(new AppError('Could not fond any users'));
	}

	res.status(200).json({
		users,
	});
};

exports.getUserById = async (req, res, next) => {
	let user;

	try {
		user = await User.findById(req.params.id);
	} catch (error) {
		return next(new AppError('Could not find user for provided id.', 404));
	}

	if (!user) {
		return next(new AppError('Could not find user for provided id.', 404));
	}

	res.json({
		userName: {
			firstName: user.firstname,
			lastName: user.lastname,
		},
	});
};

exports.createUser = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);

		res.status(201).json({
			status: 'success',
			user: newUser,
		});
	} catch (error) {
		return next(new AppError('Could not create user, please try again.', 401));
	}
};

exports.updateUser = async (req, res, next) => {
	const { id } = req.params;

	let existingUser;
	try {
		existingUser = await User.findById(id);
	} catch (error) {
		return next(new AppError('something gets wrong', 401));
	}

	if (!existingUser) {
		return next(new AppError('Could not find user for provided id.', 404));
	}

	if (req.user._id.toString() !== existingUser._id.toString()) {
		return next(
			new AppError('You dont have permission to update this user', 401)
		);
	}

	try {
		const userUpdate = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({
			status: 'success',
			user: userUpdate,
		});
	} catch (error) {
		return next(new AppError('Invalid data sent', 404));
	}
};

exports.deleteUser = async (req, res, next) => {
	if (req.user._id.toString() !== req.params.id.toString()) {
		return next(new AppError('You dont have permission to delete user!!', 401));
	}

	try {
		await User.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			user: null,
		});
	} catch (error) {
		return next(new AppError('Something went wrong, try again', 404));
	}
};
