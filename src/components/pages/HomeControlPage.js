import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { Modal } from "antd";
import SongUpload from "../form/SongUpload";

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
`;

const HomeControlPage = () => {
	const [upload, setUpload] = useState(false);
	return (
		<Container>
			<Item>
				<AiFillHome />
				Home
			</Item>
			<Item onClick={() => setUpload(!upload)}>
				<MdCloudUpload />
				Upload
			</Item>
			<Modal
				centered
				open={upload}
				onCancel={() => setUpload(!upload)}
				footer={null}
				width={350}
			>
				<SongUpload />
			</Modal>
		</Container>
	);
};

export default HomeControlPage;
