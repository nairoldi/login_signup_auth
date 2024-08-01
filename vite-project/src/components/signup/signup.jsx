/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "../../api/axios";

export default function Signup() {
	const navigate = useNavigate();
	const REGISTER_URL = "/login/signup";

	const userRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [user, setUser] = useState("");

	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(email);
		//console.log(pass);
		//console.log(user);
		const new_user = { email: email, pass: pass, user: user };

		try {
			const response = await axios.post(REGISTER_URL, new_user, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			// responce from server
			//console.log(responce.data);
			//console.log(responce.accessToken);
			// full responce object
			//console.log(JSON.stringify(responce));
			if (response.status == 201) navigate("/");
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			//errRef.current.focus();
			return;
		}
	};

	return (
		<section>
			<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl ">
					<h1 className="text-3xl font-semibold text-center text-purple-700 underline">
						Motion Mastery
					</h1>
					<h1 className="text-xl font-serif text-center text-purple-700">
						Sign up
					</h1>

					<form className="mt-6" onSubmit={handleSubmit}>
						<label
							htmlFor="email"
							className="mb-2 block text-sm font-semibold text-gray-800"
						>
							Email
						</label>
						<input
							type="email"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							id="email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>

						<label className="mb-2 block text-sm font-semibold text-gray-800">
							Password
						</label>
						<input
							type="password"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							id="password"
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							required
						/>

						<label
							htmlFor="username"
							className="mb-2 block text-sm font-semibold text-gray-800"
						>
							Username
						</label>
						<input
							type="text"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<button
							type="submit"
							className="mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
						>
							sign up
						</button>
					</form>
					<p className="mt-8 text-xs font-light text-center text-gray-700">
						{" "}
						Have an account?{" "}
						<a href="/" className="font-medium text-purple-600 hover:underline">
							Log in
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
