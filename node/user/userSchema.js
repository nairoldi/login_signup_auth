const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "anonymous",
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 9,
	},
	refreshToken: {
		type: String,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Users", userSchema);
