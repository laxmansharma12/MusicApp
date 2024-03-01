import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const SongdContext = createContext();

const SongsProvider = ({ children }) => {
	const [songs, setSongs] = useState([]);
	const GetAllSongs = async () => {
		try {
			//get all songs
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/music/get-music`
			);
			const localData = localStorage.getItem("Songs");
			if (localData && data?.songs?.length === localData.length) {
				const parseData = JSON.parse(localData);
				setSongs({
					...songs,
					songs: parseData.songs,
				});
			} else {
				if (data.success) {
					setSongs({
						...songs,
						songs: data.songs,
					});
					localStorage.setItem("Songs", JSON.stringify(data.songs));
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		GetAllSongs();
	}, []);
	return (
		<SongdContext.Provider value={[songs, setSongs]}>
			{children}
		</SongdContext.Provider>
	);
};

//custom hook
const useAllSongs = () => useContext(SongdContext);
export { useAllSongs, SongsProvider };
