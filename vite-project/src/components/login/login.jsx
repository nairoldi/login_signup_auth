/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

export default function Login() {
	const { setAuth } = UseAuth();
	// to set focus on the form when the components load
	const userRef = useRef();
	// to set focus on the errors if one occurs
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	// maybe not home ?
	const from = location.state?.from?.pathname || "/";
	const REGISTER_URL = "/login/login";

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [errMsg, setErrMsg] = useState("");
	//const [success, setSuccess] = useState(false);

	// set focus on first input when the component loads
	useEffect(() => {
		userRef.current.focus();
	}, []);

	// empty out any error message we might have , if the user changes the user, email, or pass state
	useEffect(() => {
		setErrMsg("");
	}, [email, pass]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		console.log(pass);
		const login_user = { email: email, pass: pass };
		//console.log("user set");
		try {
			//console.log("in try");
			const responce = await axios.post(REGISTER_URL, login_user, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			//console.log("token should be under here");
			//.log(responce.data.accessToken);
			// responce from server
			//console.log(responce.data);
			// full responce object
			//console.log(JSON.stringify(responce));
			const token = responce?.data.accessToken;
			setAuth({ email, token });
			setEmail("");
			setPass("");
			console.log("Navigating to /home...");
			navigate("/home", { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<section>
			<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl ">
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1 className="text-3xl font-semibold text-center text-purple-700 underline">
						New application
					</h1>
					<h1 className="text-xl font-serif text-center text-purple-700">
						Sign In
					</h1>
					<form className="mt-6 " onSubmit={handleSubmit}>
						<div className="mb-2">
							<label
								htmlFor="email"
								className="block text-sm font-semibold text-gray-800"
							>
								Email
							</label>
							<input
								type="email"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
								id="email"
								value={email}
								required
								ref={userRef}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="block text-sm font-semibold text-gray-800">
								Password
							</label>
							<input
								type="password"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
								id="password"
								onChange={(e) => setPass(e.target.value)}
								value={pass}
								autoComplete="off"
								required
							/>
						</div>
						<a
							href="#"
							className="text-xs text-purple-600 hover:underline"
						>
							{" "}
							Forgot Password
						</a>
						<div className="mt-6">
							<button
								type="submit"
								className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
							>
								Login
							</button>
						</div>
					</form>
					<p className="mt-8 text-xs font-light text-center text-gray-700">
						{" "}
						Don't have an account?{" "}
						<a
							href="/signup"
							className="font-medium text-purple-600 hover:underline"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
