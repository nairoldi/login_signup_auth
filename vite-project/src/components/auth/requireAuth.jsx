/* eslint-disable no-unused-vars */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
const Secret = import.meta.env.jwtSecret;

export default function RequireAuth() {
	const { auth } = UseAuth();
	const location = useLocation();
	console.log("auth:", auth);
	/* 
    if the user is logged in and has any token, the outlet represents any child compnent nested inside. 
	these childern will be protected if the user is signed in 
	*/
	/*right now the auth state just needs to have an email to be authorized to access the protected routes. later on i
	can change this to have roles and only allow a user with a specific role to access a route
	*/
	return auth?.email ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
}
