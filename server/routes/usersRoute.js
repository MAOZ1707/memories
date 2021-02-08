const express = require('express');
const { body } = require('express-validator');

const checkAuth = require('../middleware/checkAuth');
const userController = require('../controller/usersController');
const authController = require('../controller/authController');

const router = express.Router();

router.post(
	'/signup',
	body('firstname').isString().isLength({ min: 3 }),
	body('lastname').isString().isLength({ min: 3 }),
	body('email').isEmail().normalizeEmail(),
	body('password').isLength({ min: 8 }),
	authController.signup
);

router.post(
	'/login',
	body('email').isEmail().normalizeEmail(),
	body('password').isLength({ min: 8 }),
	authController.signin
);

router.use(checkAuth);

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
