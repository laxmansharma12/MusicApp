import React from "react";
import styled from "styled-components";
import { SearchInput } from "../form/SearchInput";

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
const ButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	gap: 10px;
	margin-right: 10px;
	align-items: center;
	@media screen and (max-width: 1120px) {
		display: none;
	}
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
	transition: all 0.6s ease-in-out;
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
	transition: all 0.6s ease-in-out;
	&:hover {
		background-color: #383636;
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;
const LogoutButton = styled.button`
	background-color: rgb(5, 163, 49);
	border: none;
	justify-content: center;
	display: flex;
	align-items: center;
	height: 70%;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
	padding: 0 20px;
	font-weight: 500;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.6s ease-in-out;
	&:hover {
		background-color: rgb(13, 207, 68);
	}
	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`;

const Navbar = () => {
	return (
		<Nav>
			<SearchInput />
			<ButtonContainer>
				<LoginButton href="/login">Login</LoginButton>
				<RegisterButton href="/register">Register</RegisterButton>
			</ButtonContainer>
		</Nav>
	);
};

export default Navbar;
