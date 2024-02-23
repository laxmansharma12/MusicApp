import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import PlaylistUpload from "./PlaylistUpload"; // corrected import statement
import axios from "axios";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import SyncLoader from "react-spinners/SyncLoader";
import musicPhoto from "../images/music.png";

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

const SongUpload = ({ upload, setUpload }) => {
	const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const [playlist, setPlaylist] = useState();
	const [name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [music, setMusic] = useState("");
	const [artist, setArtist] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [defaultDP, setDefaultDP] = useState(musicPhoto);

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
			if (playlist !== undefined) {
				setIsSubmitting(true);
				const MusicData = new FormData();
				MusicData.append("name", name);
				MusicData.append("artist", artist);
				MusicData.append("music", music);
				if (!photo) {
					// Convert the default musicPhoto into a File object
					const defaultPhotoBlob = await fetch(musicPhoto).then((res) =>
						res.blob()
					);
					const defaultPhotoFile = new File(
						[defaultPhotoBlob],
						"musicPhoto.png"
					);

					MusicData.append("photo", defaultPhotoFile);
				} else {
					MusicData.append("photo", photo);
				}
				MusicData.append("playlist", playlist);
				const { data } = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/api/v1/music/create-music`,
					MusicData
				);
				if (data) {
					toast.success(data.message);
					setUpload(!upload);
					setIsSubmitting(false);
					window.location.reload();
				} else {
					setIsSubmitting(false);
					toast.error(data.message);
				}
			} else {
				toast.error("Please Select Playlist");
			}
		} catch (error) {
			setIsSubmitting(false);
			toast.error("faild to upload song");
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
				{!isSubmitting && (
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
										required
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
								<L htmlFor="artist-name">Artist Name</L>{" "}
								{/* corrected htmlFor */}
								<Input
									type="text"
									value={artist}
									onChange={(e) => setArtist(e.target.value)}
									placeholder="Enter Artist Name"
									required
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
				)}
				{isSubmitting && (
					<Loader>
						<H2>Hold on a moment...</H2>
						<P>We're adding your song.</P>
						<SyncLoader color="#000" />
					</Loader>
				)}
			</Modal>

			{showCreatePlaylist && (
				<PlaylistUpload
					showCreatePlaylist={showCreatePlaylist}
					setShowCreatePlaylist={setShowCreatePlaylist}
				/>
			)}
		</>
	);
};

export default SongUpload;
