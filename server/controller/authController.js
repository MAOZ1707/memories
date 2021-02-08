const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../model/usersSchema');
const AppError = require('../utils/appError');

const signToken = (id) => jwt.sign({ id: id }, process.env.JWT_SECRET);

exports.signup = async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new AppError('Invalid inputs passed, please check your data.', 400)
		);
	}

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

		const token = signToken(newUser._id);

		res.status(200).json({
			token,
			user: newUser,
		});
	} catch (error) {
		return next(new AppError('Please check your credentials', 500));
	}
};

exports.signin = async (req, res, next) => {
	const { email, password } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new AppError('Invalid inputs passed, please check your data.', 400)
		);
	}

	let existingUser;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (error) {
		return next(new AppError('Login failed, please try again later.', 500));
	}

	if (!existingUser) {
		return next(new AppError('Login failed, could not log you in.', 401));
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (error) {
		return next(
			new AppError('Login failed, please check your credentials.', 500)
		);
	}

	if (!isValidPassword) {
		return next(new AppError('Invalid password.', 401));
	}

	const token = signToken(existingUser._id);

	res.status(201).json({
		token,
		user: existingUser,
	});
};
