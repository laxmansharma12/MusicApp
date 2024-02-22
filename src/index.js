import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authProvider.js";
import { SongsProvider } from "./context/SongsProvider.js";
import { UpcomingSongProvider } from "./context/upcomingSongsProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<AuthProvider>
		<SongsProvider>
			<UpcomingSongProvider>
				<BrowserRouter>
					<App />
					<Toaster />
				</BrowserRouter>
			</UpcomingSongProvider>
		</SongsProvider>
	</AuthProvider>
);
