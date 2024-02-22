import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useAuth } from "../../context/authProvider";
import ForgotPassword from "./ForgotPassword";

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 90%;
	padding-left: 12px;
`;

const LoginHeader = styled.h2`
	font-weight: bold;
	font-size: 30px;
	margin: 0 0 20px 0;
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
`;

const Section = styled.div`
	padding-bottom: 15px;
	display: flex;
	flex-direction: column;
`;

const L = styled.label`
	font-weight: 500;
	font-size: 17px;
	padding: 0 0 5px 0;
`;

const Input = styled.input`
	outline: none;
	box-shadow: none;
	height: 20px;
	padding: 5px 5px;
	border-radius: 5px;
	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

const Button = styled.button`
	background-color: rgb(16, 188, 19);
	color: #fff;
	border: none;
	width: 100%;
	height: 40px;
	font-weight: bold;
	padding: 5px 0;
	border-radius: 5px;
	margin: 10px 0;
	box-shadow: 3px 3px 7px rgba(61, 60, 60, 0.5);
	&:hover {
		background-color: rgb(13, 212, 16);
	}
`;

const Span = styled.span`
	color: rgb(66, 64, 64);
`;

const Login = ({ login, setLogin, signup, setSignup }) => {
	const [auth, setAuth] = useAuth();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [showResetForm, setShowResetForm] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`,
				{
					email,
					password,
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
				setLogin(!login);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				localStorage.setItem("auth", JSON.stringify(res.data));
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error("Login Error:", error);
		}
	};

	return (
		<>
			<Modal
				centered
				open={login}
				onCancel={() => setLogin(!login)}
				footer={null}
				width={300}
			>
				<LoginContainer>
					<LoginHeader>Login</LoginHeader>
					<Form onSubmit={handleLogin}>
						<Section>
							<L htmlFor="email">Email</L>
							<Input
								type="email"
								placeholder="Enter email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Section>
						<Section>
							<L htmlFor="password">Password</L>
							<Input
								type="password"
								placeholder="Enter password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Span>
								Forgot password?{" "}
								<Link
									onClick={() => {
										setShowResetForm(!showResetForm);
									}}
								>
									Reset
								</Link>
							</Span>
						</Section>
						{!showResetForm && <Button type="submit">Login</Button>}
					</Form>
					<Span>
						Not registered?{" "}
						<Link
							onClick={() => {
								setLogin(!login);
								setSignup(!signup);
							}}
						>
							Register
						</Link>
					</Span>
				</LoginContainer>
			</Modal>
			{showResetForm && (
				<ForgotPassword
					setLogin={setLogin}
					showResetForm={showResetForm}
					setShowResetForm={setShowResetForm}
				/>
			)}
		</>
	);
};

export default Login;
