const express = require("express");

const userController = require("../controller/usersController");
const authController = require("../controller/authController");

const router = express.Router();

// router.post("/signup", authController.signup);

// router.route("/login").post(authController.login);

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
