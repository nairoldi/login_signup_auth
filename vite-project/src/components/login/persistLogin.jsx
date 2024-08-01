/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import UseAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = UseAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, []);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`);
	}, [isLoading]);

	return <>{isLoading ? <p>Loading... </p> : <Outlet />}</>;
}
