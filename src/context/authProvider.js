import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: "",
	});

	// default axios
	axios.defaults.headers.common["Authorization"] = auth?.token;

	useEffect(() => {
		const data = localStorage.getItem("auth");
		if (data) {
			const parseData = JSON.parse(data);
			setAuth(parseData);
		}
	}, []);

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const [auth, setAuth] = useContext(AuthContext);
	return [auth, setAuth];
};

export { useAuth, AuthProvider };
