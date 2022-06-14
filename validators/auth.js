const { check, oneOf } = require("express-validator");

exports.userLoginValidator = [
	oneOf([
		check("user")
			.exists()
			.withMessage("user is required")
			.isLength({ min: 3 })
			.withMessage("wrong user length"),

		check("user")
			.exists()
			.withMessage("user is required")
			.isEmail()
			.withMessage("user not valid")
	]),
	check("password").exists().withMessage("password is required")
];