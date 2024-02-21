import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import SongUpload from "../form/SongUpload";
import { useAuth } from "../../context/authProvider";
import { toast } from "react-hot-toast";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 10px;
	background-color: #121212;
	color: #fff;
	padding: 20px 25px 20px;
	border-radius: 10px;
	width: 80%;
`;
const Item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`;

const HomeControlPage = () => {
	const [auth, setAuth] = useAuth();
	const [upload, setUpload] = useState(false);
	return (
		<Container>
			<Item>
				<AiFillHome />
				Home
			</Item>
			<Item
				onClick={() => {
					auth.user
						? setUpload(!upload)
						: toast.error("Please login to add song");
				}}
			>
				<MdCloudUpload />
				Upload
			</Item>
			{upload && <SongUpload upload={upload} setUpload={setUpload} />}
		</Container>
	);
};

export default HomeControlPage;
