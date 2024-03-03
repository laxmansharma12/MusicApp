import { createContext, useContext, useEffect, useState } from "react";
const PlaylistSongContext = createContext();

const PlaylistSongProvider = ({ children }) => {
	const [playlistSongs, setPlaylistSongs] = useState({
		playlist: "",
		songs: [],
	});
	return (
		<PlaylistSongContext.Provider value={[playlistSongs, setPlaylistSongs]}>
			{children}
		</PlaylistSongContext.Provider>
	);
};

//custom hook
const usePlaylistSongs = () => useContext(PlaylistSongContext);
export { usePlaylistSongs, PlaylistSongProvider };
