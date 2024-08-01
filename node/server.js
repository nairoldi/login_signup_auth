const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use((req, res, next) => {
	console.log("Cookies:", req.cookies);
	next();
});

const PORT = process.env.SERVER_PORT || 3001;

// routers
const Login = require("./login/loginRoutes").LoginRouter;
const Auth = require("./auth/authRoutes").AuthRouter;
const User = require("./user/userRoutes").UserRouter;

// test entry point
app.get("/api", (req, res, next) => {
	console.log("your in /api");
	res.send("you made it");
	next();
});

app.use((req, res, next) => {
	console.log("req path:", req.path);
	next();
});

// routes
app.use("/login", Login);
app.use("/auth", Auth);
app.use("/user", User);

app.listen(PORT, async () => {
	console.log(`Running on port ${PORT}`);
	connect_mongo();
	//preloadData();
});

async function connect_mongo() {
	try {
		console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
		if (process.env.NODE_ENV !== "test") {
			await mongoose.connect(process.env.MONGO_URL);
			console.log("we are on main db");
		} else {
			await mongoose.connect(process.env.MONGO_TEST_URL);
		}
		console.log("we have connected to mongo!!");
	} catch (error) {
		//console.log("connection failed");
		console.log(error.message);
	}
}



module.exports = {
	app,
};
