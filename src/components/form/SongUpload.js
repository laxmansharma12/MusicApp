import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import PlaylistUpload from "./PlaylistUpload"; // corrected import statement
import axios from "axios";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";

const { Option } = Select; // corrected destructuring

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

const SongContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	font-size: 17px;
	padding: 5px;
	border: 1px solid rgb(66, 64, 64);
	border-radius: 5px;
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
const MusicInput = styled.input``;

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
const Playlist = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
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

const CreateBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid rgb(66, 64, 64);
	padding: 10px;
	background-color: rgb(226, 223, 223);
	margin-left: 10px;
	border-radius: 5px;
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
	const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const [playlist, setPlaylist] = useState();
	const [name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [music, setMusic] = useState("");
	const [artist, setArtist] = useState("");

	//get all playlist
	const getAllPlaylists = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/playlist/get-playlist`
			);
			if (data?.success) {
				setPlaylists(data?.playlist);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wwent wrong in getting playlist");
		}
	};
	useEffect(() => {
		getAllPlaylists();
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const MusicData = new FormData();
			MusicData.append("name", name);
			MusicData.append("artist", artist);
			MusicData.append("music", music);
			MusicData.append("photo", photo);
			MusicData.append("playlist", playlist);
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/music/create-music`,
				MusicData
			);
			if (data) {
				toast.success(data.message);
				setShowCreatePlaylist(!showCreatePlaylist);
				window.location.reload();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Modal
				centered
				open={upload}
				onCancel={() => setUpload(!upload)}
				footer={null}
				width={350}
			>
				<Container>
					<Header>Upload Your Song</Header>
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
							<L htmlFor="song">Song</L>
							<SongContainer>
								<MusicInput
									type="file"
									name="music"
									accept="audio/*"
									onChange={(e) => setMusic(e.target.files[0])}
								></MusicInput>
							</SongContainer>
						</Section>
						<Section>
							<L htmlFor="song-name">Song Name</L>
							<Input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter Song Name"
								required
							/>
						</Section>
						<Section>
							<L htmlFor="artist-name">Artist Name</L> {/* corrected htmlFor */}
							<Input
								type="text"
								value={artist}
								onChange={(e) => setArtist(e.target.value)}
								placeholder="Enter Artist Name"
							/>
						</Section>
						<Section>
							<L htmlFor="playlist">Playlist</L>
							<Playlist>
								<Select
									placeholder="Select Playlist"
									className="select-playlist"
									size="large"
									onChange={(value) => {
										setPlaylist(value);
									}}
									value={playlist}
								>
									<>
										{playlists?.map((p) => (
											<Option key={p._id} value={p._id} required>
												{p.name ? p.name : ""}
											</Option>
										))}
									</>
								</Select>
								<CreateBtn>
									<FaPlus
										onClick={() => setShowCreatePlaylist(!showCreatePlaylist)}
									/>
								</CreateBtn>
							</Playlist>
						</Section>
						<Btn type="submit">Upload</Btn>
					</Form>
				</Container>
			</Modal>

			{showCreatePlaylist && (
				<PlaylistUpload
					showCreatePlaylist={showCreatePlaylist} // Corrected prop name
					setShowCreatePlaylist={setShowCreatePlaylist}
				/>
			)}
		</>
	);
};

export default SongUpload;
