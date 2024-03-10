import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/:slug" element={<Home />} />
			<Route path="/:slug/:playlist" element={<Home />} />
		</Routes>
	);
};

export default App;
