/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axiosPrivate from "../api/axios";
import { useEffect } from "react";
import UseRefreshToken from "./useRefreshToken";
import UseAuth from "./useAuth";

export default function UseAxiosPrivte() {
	const refresh = UseRefreshToken();
	const { auth } = UseAuth();

	/*
	 *    Interceptors are methods which are triggered before or after the main method. There are two types of interceptors:
	 *        request interceptor: - It allows you to write or execute a piece of your code before the request gets sent.
	 *        response interceptor: - It allows you to write or execute a piece of your code before response reaches the calling end.
	 */
	useEffect(() => {
		//console.log("in use axios private");
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				// if the headers dont exist , its the inital request
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			// if our token is expired
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					// only want to retry once , the sent property indicates that
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					//console.log(`inAxiosPrivate: new token => ${newAccessToken}`);
					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					//updated the request with new token, try request again
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			// remove interceptor when done
			axiosPrivate.interceptors.response.eject(responseIntercept);
			axiosPrivate.interceptors.request.eject(requestIntercept);
		};
	}, [auth, refresh]);

	return axiosPrivate;
}
