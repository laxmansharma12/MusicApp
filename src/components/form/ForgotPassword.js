import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const ForgotPassword = ({ showResetForm, setShowResetForm, setLogin }) => {
	const [email, SetEmail] = useState();
	const [answer, setAnswer] = useState();
	const [newPassword, setNewPassword] = useState();

	const handleReset = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/forgot-password`,
				{
					email,
					answer,
					newPassword,
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
				setShowResetForm(!showResetForm);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {}
	};
	return (
		<Modal
			centered
			open={showResetForm}
			onCancel={() => {
				setLogin(true);
				setShowResetForm(!showResetForm);
			}}
			footer={null}
			width={300}
		>
			<ForgotPasswordContainer>
				<ResetHeader>Reset Password</ResetHeader>
				<Form onSubmit={handleReset}>
					<Section>
						<L htmlFor="email">Email</L>
						<Input
							type="email"
							required
							placeholder="Enter email"
							onChange={(e) => SetEmail(e.target.value)}
						></Input>
					</Section>
					<Section>
						<L htmlFor="question">What is your favourite song?</L>
						<Input
							className="form-control"
							type="text"
							required
							placeholder="Enter your answer"
							onChange={(e) => setAnswer(e.target.value)}
						></Input>
					</Section>
					<Section>
						<L htmlFor="newPassword">New Password</L>
						<Input
							type="text"
							required
							placeholder="Enter your new password"
							onChange={(e) => setNewPassword(e.target.value)}
						></Input>
					</Section>
					<Button type="submit">Reset</Button>
				</Form>
			</ForgotPasswordContainer>
		</Modal>
	);
};

export default ForgotPassword;

const ForgotPasswordContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 90%;
	padding-left: 12px;
`;
const ResetHeader = styled.h2`
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
