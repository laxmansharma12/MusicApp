import React, { useState } from "react";
import styled from "styled-components";
import { SearchInput } from "../components/form/SearchInput";
import Login from "../components/form/Login";
import Register from "../components/form/Register";
import toast from "react-hot-toast";
import { useAuth } from "../context/authProvider";
import { IoMdCloudUpload } from "react-icons/io";
import SongUpload from "../components/form/SongUpload";

const Nav = styled.div`
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #121212;
	flex-direction: row;
	color: #fff;
	width: 100%;
	position: sticky;
	border-radius: 10px;
	z-index: 10;
`;

const SearchContainer = styled.div`
	@media (max-width: 640px) {
		display: none;
	}
`;
const ButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	gap: 10px;
	margin-right: 10px;
	align-items: center;
`;

const LoginButton = styled.a`
	border: 1px solid #fff;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 9px 18px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #383636;
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;
const RegisterButton = styled.a`
	background-color: rgba(44, 42, 42, 0.762);
	border: none;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 10px 18px;
	font-weight: 500;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #383636;
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;
const LogoutButton = styled.button`
	background-color: rgb(209, 19, 19);
	border: none;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 9px 18px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: rgb(230, 30, 30);
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;

const UpdBtn = styled.button`
	background-color: rgb(12, 178, 12);
	border: none;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 5px 13px;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: rgb(20, 229, 20);
	}
	@media screen and (max-width: 768px) {
		font-size: 18px;
	}
	@media screen and (min-width: 640px) {
		display: none;
	}
`;

const H1 = styled.h1`
	margin-left: 10px;
	@media (max-width: 640px) {
		font-size: 1.6em;
	}
`;

const Navbar = () => {
	const [auth, setAuth] = useAuth();
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);
	const [upload, setUpload] = useState(false);

	const HandleLogout = () => {
		setAuth({
			...auth,
			user: null,
			token: "",
		});
		toast.success("Logout Successfully!!");
		window.location.reload();
		localStorage.removeItem("auth");
	};
	return (
		<Nav>
			<H1>Music Player</H1>
			<SearchContainer>
				<SearchInput />
			</SearchContainer>
			<ButtonContainer>
				{!auth.user ? (
					<>
						<LoginButton onClick={() => setLogin(!login)}>Login</LoginButton>
						{login && (
							<Login
								login={login}
								setLogin={setLogin}
								signup={signup}
								setSignup={setSignup}
							/>
						)}
						<RegisterButton onClick={() => setSignup(!signup)}>
							Register
						</RegisterButton>
						{signup && (
							<Register
								signup={signup}
								setSignup={setSignup}
								login={login}
								setLogin={setLogin}
							/>
						)}
					</>
				) : (
					<>
						<UpdBtn>
							<IoMdCloudUpload onClick={() => setUpload(!upload)} />
						</UpdBtn>
						{upload && <SongUpload upload={upload} setUpload={setUpload} />}
						<LogoutButton onClick={() => HandleLogout()}>Logout</LogoutButton>
					</>
				)}
			</ButtonContainer>
		</Nav>
	);
};

export default Navbar;
