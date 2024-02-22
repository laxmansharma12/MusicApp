import { createContext, useContext, useEffect, useState } from "react";
const UpcomingSongContext = createContext();

const UpcomingSongProvider = ({ children }) => {
	const [upsongs, setUpSongs] = useState([]);

	useEffect(() => {
		const data = localStorage.getItem("UpComingSongs");
		if (data) {
			const parseData = JSON.parse(data);
			setUpSongs(parseData);
		}
	}, []);
	return (
		<UpcomingSongContext.Provider value={[upsongs, setUpSongs]}>
			{children}
		</UpcomingSongContext.Provider>
	);
};

//custom hook
const useUpSongs = () => useContext(UpcomingSongContext);
export { useUpSongs, UpcomingSongProvider };
