import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 90%;
	padding-left: 12px;
`;

const RegisterHeader = styled.h2`
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

const Register = () => {
	const [name, SetName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [answer, setAnswer] = useState();

	const handlesubmit = async (e) => {
		e.preventDefault();
		// try {
		// 	const res = await axios.post(
		// 		`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/register`,
		// 		{
		// 			name,
		// 			email,
		// 			password,
		// 			answer,
		// 		}
		// 	);
		// 	if (res.data.success) {
		// 		toast.success(res.data.message);
		// 		navigate("/login");
		// 	} else {
		// 		toast.error(res.data.message);
		// 	}
		// } catch (error) {}
	};
	return (
		<RegisterContainer>
			<RegisterHeader>Register</RegisterHeader>
			<Form onSubmit={handlesubmit}>
				<Section>
					<L htmlFor="name">Name</L>
					<Input
						className="form-control"
						type="text"
						required
						// placeholder="Enter your name"
						onChange={(e) => SetName(e.target.value)}
					></Input>
				</Section>
				<Section>
					<L htmlFor="email">Email</L>
					<Input
						className="form-control"
						type="email"
						required
						// placeholder="Enter your email"
						onChange={(e) => setEmail(e.target.value)}
					></Input>
				</Section>
				<Section>
					<L htmlFor="password">Password</L>
					<Input
						className="form-control"
						type="text"
						required
						// placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
					></Input>
				</Section>
				<Section>
					<L htmlFor="question">Which is your favourite song?</L>
					<Input
						className="form-control"
						type="text"
						required
						// placeholder="Enter your answer"
						onChange={(e) => setAnswer(e.target.value)}
					></Input>
				</Section>
				<Button type="submit">Register</Button>
			</Form>
			<Span>
				Allready registered? <Link to="/login">Login</Link>
			</Span>
		</RegisterContainer>
	);
};

export default Register;
