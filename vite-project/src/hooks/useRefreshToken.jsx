/* eslint-disable no-unused-vars */
import UseAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
	const { setAuth } = UseAuth();

	const REGISTER_URL = "/auth/";

	const refresh = async () => {
		//console.log("in refresh()");
		// with credentials true allows us to send cookies with our request
		const response = await axios.get(REGISTER_URL, { withCredentials: true });
		//console.log(response.data.accessToken);
		setAuth((prev) => {
			//console.log(JSON.stringify(prev));
			//console.log(response.data.accessToken);
			return { ...prev, accessToken: response.data.accessToken };
		});
		return response.data.accessToken;
	};
	return refresh;
}
