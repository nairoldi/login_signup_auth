/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
const BASE_URL = "http://localhost:3001";

//attached intercepters to axios private that will attach jwt tokens for us and even retry when we fail the first time

export default axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
