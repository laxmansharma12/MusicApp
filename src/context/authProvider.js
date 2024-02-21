import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: "",
	});

	useEffect(() => {
		const data = localStorage.getItem("auth");
		if (data) {
			const parseData = JSON.parse(data);
			setAuth(parseData); // Corrected line
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
