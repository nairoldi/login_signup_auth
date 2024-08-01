const express = require("express");
const bodyParser = require("body-parser");
const sutil = require("../util/util");
const UserRouter = express.Router();
UserRouter.use(bodyParser.json());


REQ_KEYS = {};

UserRouter.use((req, res, next) => {
	console.log("Request reached UserRouter middleware");
	console.log("Cookies:", req.cookies);
	res.locals.bodyData = req.body;
	console.log(req.path);
	sutil.ValidateToken(req, res, next);
});

UserRouter.get("/myInfo", async (req, res, next) => {
	await userController.getUserInfo(req, res, next);
});

UserRouter.post("/createworkout", async (req, res, next) => {
	await userController.createWorkout(req, res, next);
});

UserRouter.patch("/updateUserField", async (req, res, next) => {
	await userController.updateUserField(req, res, next);
});

// might not need all below soon
UserRouter.patch("/updateStartingWeight", async (req, res, next) => {
	await userController.updateStartingWeight(req, res, next);
});

UserRouter.patch("/updateCurrentWeight", async (req, res, next) => {
	await userController.updateCurrentWeight(req, res, next);
});

UserRouter.patch("/updateGoalWeight", async (req, res, next) => {
	await userController.updateGoalWeight(req, res, next);
});

UserRouter.patch("/updateWeeklyGoal", async (req, res, next) => {
	await userController.updateWeeklyGoal(req, res, next);
});

UserRouter.patch("/updateHeight", async (req, res, next) => {
	await userController.updateHeight(req, res, next);
});

module.exports = {
	UserRouter: UserRouter,
};
