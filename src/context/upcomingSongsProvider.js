import { createContext, useContext, useState } from "react";
const UpcomingSongContext = createContext();

const UpcomingSongProvider = ({ children }) => {
	const [upsongs, setUpSongs] = useState([]);

	return (
		<UpcomingSongContext.Provider value={[upsongs, setUpSongs]}>
			{children}
		</UpcomingSongContext.Provider>
	);
};

//custom hook
const useUpSongs = () => useContext(UpcomingSongContext);
export { useUpSongs, UpcomingSongProvider };
