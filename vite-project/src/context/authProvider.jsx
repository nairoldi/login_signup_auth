/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// this file will provide context for the full app

import { createContext, useState } from "react";

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	return (
		<authContext.Provider value={{ auth, setAuth }}>
			{children}
		</authContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default authContext;
