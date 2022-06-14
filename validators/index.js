const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
	const errors = validationResult(req)
  if(!errors.isEmpty()) {
		// 422 server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
		return res.status(422).json({
			error: errors.array()[0].msg
		});
	}
  next();
};
