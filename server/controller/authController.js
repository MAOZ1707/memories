const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/usersSchema');
const AppError = require('../utils/appError');

exports.signup = async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		return next(new AppError('Signup failed, please try again later', 404));
	}

	if (existingUser) {
		return next(new AppError('User exists already, please login instead', 422));
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(
			new AppError('Something went wrong, please try again later', 422)
		);
	}

	try {
		const newUser = await User.create({
			firstname,
			lastname,
			password: hashedPassword,
			email,
		});

		const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

		res.status(200).json({
			token,
			user: newUser,
		});
	} catch (error) {
		return next(new AppError('Please check your credentials', 500));
	}
};

exports.signin = async (req, res, next) => {};
