const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../user/userSchema");
const config = require("../config/loginConfig");

async function createAccount(req, res, next) {
	var name;
	var email = req.body.email;
	var pass = req.body.pass;
	var username = req.body.user;
	var has_name = false;
	console.log(email);
	const hashed_password = bcrypt.hashSync(pass, 10);
	// console.log(hashed_password);

	if (req.body.hasOwnProperty("name")) {
		has_name = true;
		name = req.body.name;
	}

	try {
		var new_user;
		if (has_name) {
			new_user = new User({
				name: name,
				email: email,
				password: hashed_password,
				username: username,
			});
		} else {
			new_user = new User({
				email: email,
				password: hashed_password,
				username: username,
			});
		}

		await new_user.save();
		res.status(201).send({ created: true });
	} catch (error) {
		console.log("new signup failed");
		//console.log(`the error is ${error}`);
		if (error.code == 11000) {
			res.status(403).send({
				created: false,
				message: "Email already exists! try logging in",
			});
		} else {
			res.status(409).send({ created: false, message: error.message });
		}
	}
}

async function signIn(req, res, next) {
	var email = req.body.email;
	var pass = req.body.pass;
	//console.log("in signIn");
	//console.log(email);

	try {
		const user = await User.findOne({ email: email });

		if (user) {
			const passCompare = await bcrypt.compare(pass, user.password);

			if (passCompare) {
				console.log(user._id);
				var accessToken = jwt.sign(
					{ id: user._id },
					process.env.jwtSecret,
					{
						expiresIn: "90s",
					},
				);
				var refreshToken = jwt.sign(
					{ id: user._id },
					process.env.refreshSecret,
					{ expiresIn: "1d" },
				);
				user.refreshToken = refreshToken;
				await user.save();
				//const hashed_token = bcrypt.hashSync(token, 10);
				// 24 * 60 * 60 * 1000 is one day because its in mili seconds
				//console.log("Before setting cookie");
				res.clearCookie("JWT_TOKEN");
				//res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
				res.cookie("JWT_TOKEN", refreshToken, {
					secure: true,
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				});
				//console.log("After setting cookie");
				res.json({
					accessToken: accessToken,
					message: `success ${user.username} is logged in`,
				});
			} else {
				res.status(401).json({ message: "password was not a match" });
				next();
			}
		} else {
			res.status(401).json({ message: "no user with that email exists" });
			next();
		}
	} catch (e) {
		res.status(401).send(e.message);
	}
}

async function DeleteUser(req, res, next) {
	const user = res.locals.user;
	try {
		const deleteUser = await User.deleteOne({ _id: user });
		res.send({ deleted: true, count: deleteUser });
	} catch (e) {
		res.send({ message: e.message });
	}
}

module.exports = {
	createAccount: createAccount,
	signIn: signIn,
	DeleteUser: DeleteUser,
};
