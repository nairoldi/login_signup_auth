const express = require("express");
const bodyParser = require("body-parser");

const sutil = require("../util/util.js");
const authController = require('../auth/authController.js');
const AuthRouter = express.Router();

AuthRouter.get('/', async (req, res, next) => {
    await authController.handleRefreshToken(req, res, next);
});


module.exports = {AuthRouter:AuthRouter }
