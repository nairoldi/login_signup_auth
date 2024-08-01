/* eslint-disable no-unused-vars */
import { useContext } from "react";
import authContext from "../context/authProvider";

// custom hook allows us to use useAuth and pull what we need from context
export default function UseAuth() {
	return useContext(authContext);
}
