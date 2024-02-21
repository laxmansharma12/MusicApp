import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
			<Toaster />
		</BrowserRouter>
	</AuthProvider>
);
