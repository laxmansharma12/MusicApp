import React from "react";
import HomeControlPage from "./components/pages/HomeControlPage";
import { Route, Routes } from "react-router-dom";
import PlaylistPage from "./components/pages/PlaylistPage";
import Home from "./components/Home";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default App;
