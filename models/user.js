const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true
		},
		firstName: {
			type: String,
			required: true,
			max: 32
		},
		lastName: {
			type: String,
			required: true,
			max: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		roles: [],
    refreshToken: {
      type: String
    }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);