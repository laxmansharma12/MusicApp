import React from "react";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Upload, Select } from "antd";

const Option = Select;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 90%;
	padding-left: 12px;
`;

const Header = styled.h2`
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
	.select-playlist {
		border: 1px solid rgb(66, 64, 64);
		border-radius: 10px;
		outline: none;
	}
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

const Btn = styled.button`
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

const SongUpload = ({ upload, setUpload }) => {
	return (
		<Modal
			centered
			open={upload}
			onCancel={() => setUpload(!upload)}
			footer={null}
			width={350}
		>
			<Container>
				<Header>Upload Your Song</Header>
				<Form>
					<Section>
						<Upload
							action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
							listType="picture"
						>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
					</Section>
					<Section>
						<L htmlFor="song-name">Song Name</L>
						<Input type="text" placeholder="Enter Song Name" required></Input>
					</Section>
					<Section>
						<L htmlFor="artirt-name">Artist Name</L>
						<Input type="text" placeholder="Enter Song Name"></Input>
					</Section>
					<Section>
						<L htmlFor="playlist">Playlist</L>
						<Select
							placeholder="Select Playlist"
							className="select-playlist"
							size="large"
							onChange={(value) => {}}
						>
							<Option>a</Option>
							<Option>a</Option>
							<Option>a</Option>

							{/* {auth.user && (
								<>
									{categories?.map((c) => (
										<Option key={c._id} value={c._id}>
											{c.name ? c.name : ""}
										</Option>
									))}
								</>
							)} */}
						</Select>
					</Section>
					<Btn type="submit">Upload</Btn>
				</Form>
			</Container>
		</Modal>
	);
};

export default SongUpload;
