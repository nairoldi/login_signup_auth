const request = require("supertest");
const { app } = require("../server.js");
//const createAccount = require('../login/loginController');
require("dotenv").config();
const User = require("../user/userSchema.js");

userObject = {
	email: "test@email.com",
	pass: "testPass",
	user: "testUsername",
};

// Testing the API root endpoint
describe("GET /api", () => {
	test("should respond with a 200 status code", async () => {
		const response = await request(app).get("/api");
		expect(response.statusCode).toBe(200);
	});
});

// signup test
describe("POST /login/signup", () => {
	describe("given a valid email, password, and username", () => {
		test("should respond with a 201 status code and created true", async () => {
			const response = await request(app)
				.post("/login/signup")
				.send(userObject)
				.expect(201);
			expect(response.body).toEqual({ created: true });
		});
	});

	describe("POST /login/signup", () => {
		describe("given an email that already exists", () => {
			beforeEach(async () => {
				await request(app).post("/login/signup").send(userObject);
			});

			test("should respond with 403 status code and created false", async () => {
				const response = await request(app)
					.post("/login/signup")
					.send(userObject)
					.expect(403);
				expect(response.body).toEqual({
					created: false,
					message: "Email already exists! try logging in",
				});
			});
		});
	});
});

// login test
describe("POST /login/login", () => {
	beforeEach(async () => {
		await request(app).post("/login/signup").send(userObject);
	});

	describe("given valid email and password", () => {
		test("should respond with 200 and a JWT token", async () => {
			const response = await request(app).post("/login/login").send({
				email: userObject.email,
				pass: userObject.pass,
			});
			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("accessToken");
		});
	});
});
