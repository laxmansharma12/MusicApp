import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";

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
	margin: 0 0 0px 0;
`;

const ImgContainer = styled.label`
	font-weight: 500;
	font-size: 17px;
	padding: 10px;
	margin-bottom: 2rem;

	color: #000;
	background-color: #dccccc;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 5px dashed grey;
	border-radius: 5px;
	&:hover {
		background-color: rgb(184, 174, 174);
	}
	.fileIcon {
		height: 30px;
		width: 30px;
	}
`;

const PhotoControll = styled.div`
	height: fit-content;
	display: flex;
	justify-content: center;
	gap: 10px;
	align-items: center;
	flex-direction: column;
	margin-top: 30px;
	@media (max-width: 640px) {
		gap: 10px;
		padding: 0 0 3rem 0;
	}
`;

const Img = styled.img`
	padding: 0px 10px 0 10px;
	height: 150px;
	object-fit: cover;
	border-radius: 8%;
	width: 200px;
	@media (max-width: 640px) {
		height: 250px;
		width: 310px;
	}
`;
const ImgInput = styled.input``;

const ImgRemoveBtn = styled.button`
	background-color: rgb(228, 27, 27);
	padding: 5px 10px;
	border: none;
	margin-bottom: 5px;
	color: #fff;
	border-radius: 5px;
	// font-weight: bold;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	@media (max-width: 640px) {
	}
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
		border-radius: 5px;
		outline: none;
		width: 100%;
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
	padding: 5px;
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

const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 650px;
	width: 303px;
	color: #000;
	z-index: 1;
	animation: dissolveIn 1s ease-in-out;
	@media (max-width: 640px) {
		width: 95%;
	}
	@keyframes dissolveIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
const H2 = styled.h2`
	margin: 0;
	padding: 0;
`;
const P = styled.p`
	margin: 0 0 15px 0;
	padding-top: 0px;
`;

const PlaylistUpload = ({ showCreatePlaylist, setShowCreatePlaylist }) => {
	const [name, SetName] = useState("");
	const [photo, setPhoto] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	//add playlist
	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			const PlaylistData = new FormData();
			PlaylistData.append("name", name);
			PlaylistData.append("photo", photo);
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/playlist/create-playlist`,
				PlaylistData
			);
			if (data) {
				toast.success(data.message);
				setShowCreatePlaylist(!showCreatePlaylist);
				setIsSubmitting(false);
				window.location.reload();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal
			centered
			open={showCreatePlaylist}
			onCancel={() => setShowCreatePlaylist(!showCreatePlaylist)}
			footer={null}
			width={300}
		>
			{!isSubmitting && (
				<Container>
					<Header>Add Playlist</Header>
					<PhotoControll>
						{photo ? (
							<>
								{photo && photo.size < 1000000 ? (
									<>
										<Img
											src={URL.createObjectURL(photo)}
											alt="playlist Photo"
										></Img>
										<ImgRemoveBtn onClick={() => setPhoto("")}>
											Remove Image
										</ImgRemoveBtn>
									</>
								) : (
									<ImgContainer style={{ borderColor: "brown" }}>
										<CiImageOn className="fileIcon" />
										<br></br>
										<L>Click to upload Photo</L>
										<L style={{ color: "brown" }}>Size is more than 1mb</L>
										<ImgInput
											type="file"
											name="photo"
											accept="image/*"
											onChange={(e) => setPhoto(e.target.files[0])}
											hidden
										></ImgInput>
									</ImgContainer>
								)}
							</>
						) : (
							<ImgContainer>
								<CiImageOn className="fileIcon" />
								<br></br>
								<L>Click to upload Photo</L>
								<L style={{ fontSize: "12px" }}>
									*Size: less than 1mb required
								</L>
								<ImgInput
									type="file"
									name="photo"
									accept="image/*"
									onChange={(e) => setPhoto(e.target.files[0])}
									hidden
								></ImgInput>
							</ImgContainer>
						)}
					</PhotoControll>
					<Form onSubmit={handleCreate}>
						<Section>
							<L htmlFor="song-name">Playlist Name</L>
							<Input
								type="text"
								value={name}
								onChange={(e) => SetName(e.target.value)}
								placeholder="Enter Playlist Name"
								required
							></Input>
						</Section>
						<Btn type="submit">Create</Btn>
					</Form>
				</Container>
			)}
			{isSubmitting && (
				<Loader>
					<H2>Hold on a moment...</H2>
					<P>We're adding your playlist.</P>
					<SyncLoader color="#000" />
				</Loader>
			)}
		</Modal>
	);
};

export default PlaylistUpload;
