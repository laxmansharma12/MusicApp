import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GiBookshelf } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { useAllSongs } from "../../context/SongsProvider";
import PlaylistUpload from "../form/PlaylistUpload";
import { useAuth } from "../../context/authProvider";
import { GrDocumentNotes } from "react-icons/gr";
import { usePlaylistSongs } from "../../context/playlistSongsProvider";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 13px;
	background-color: #121212;
	color: #fff;
	padding: 20px 25px 20px;
	border-radius: 10px;
	height: 78vh;
	width: 80%;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	width: 100%;
	.addPlaylist {
		&:hover {
			color: rgb(130, 217, 145);
			cursor: pointer;
		}
	}
`;
const Title = styled.div`
	margin: 0.5rem 0;
`;
const L = styled.label`
	background-color: rgba(44, 42, 42, 0.762);
	border-radius: 3rem;
	padding-inline: 0.7rem;
	padding-block: 0.5rem;
	border: none;
	cursor: pointer;
	font-weight: bold;
	margin-right: 0.5rem;
	transition: 0.2s ease-in-out;
	&:hover {
		background-color: #383636;
	}
`;
const Label = styled.label``;

const ContainerInner = styled.div`
	display: flex;
	justify-content: start;
	align-items: start;
	flex-direction: column;
	gap: 13px;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	&:hover {
		overflow-y: scroll;
	}
	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #888;
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #555;
	}
`;

const PlayList = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	gap: 10px;
	cursor: pointer;
`;
const Img = styled.img`
	border: 1px solid rgb(130, 133, 135);
	height: 30px;
	width: 30px;
	margin-top: 2px;
	border-radius: 50%;
`;
const Name = styled.label`
	font-weight: bold;
`;
const Artist = styled.label`
	color: rgb(130, 133, 135);
	font-size: 14px;
	font-weight: 600;
`;
const Details = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	flex-direction: column;
`;

const EmptyPlaylist = styled.div`
	display: flex;
	justify-content: start;
	width: 99%;
	height: 100%;
	align-items: center;
	gap: 0.5rem;
	flex-direction: column;
	.emptyIcon {
		margin-top: 4rem;
		font-size: 3rem;
	}
`;

const Button = styled.button`
	border-radius: 10px;
	&:hover {
		padding: 0.3rem;
	}
`;

const PlaylistPage = () => {
	const [playlists, setPlaylists] = useState([]);
	const [songs, setSongs] = useAllSongs();
	const [auth, setAuth] = useAuth();
	const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
	const [myPlaylist, setMyPlaylist] = useState(false);
	const [myPlaylistArray, setMyPlaylistArray] = useState([]);
	const [playlistSongs, setPlaylistSongs] = usePlaylistSongs();

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
			console.error("Error fetching playlists:", error);
			toast.error("Something went wrong in getting playlists");
		}
	};

	const MyPlaylists = () => {
		const filteredPlaylists = playlists.filter(
			(p) => p.owner === auth?.user?._id
		);
		setMyPlaylistArray(filteredPlaylists);
	};

	const showPlaylistSongs = (id) => {
		const FilteredPlaylistSongs = songs?.songs.filter((p) => p.playlist === id);
		const findPlaylist = playlists.find((f) => f._id === id);
		if (FilteredPlaylistSongs.length !== 0) {
			setPlaylistSongs({
				playlist: findPlaylist.name,
				songs: FilteredPlaylistSongs,
			});
		} else {
			toast.error("No Songs in this Playlist");
		}
	};

	useEffect(() => {
		getAllPlaylists();
	}, []);

	useEffect(() => {
		MyPlaylists();
	}, [playlists]);

	return (
		<>
			<Container>
				<Header>
					<Label>
						<GiBookshelf />
						Your Library
					</Label>
					<FaPlus
						className="addPlaylist"
						onClick={() => setShowCreatePlaylist(!showCreatePlaylist)}
					/>
				</Header>
				<Title>
					<L onClick={() => setMyPlaylist(false)}>All Playlists</L>
					<L
						onClick={() => {
							auth?.user
								? (() => {
										setMyPlaylist(true);
										MyPlaylists();
								  })()
								: toast.error("Please Login");
						}}
					>
						My Playlist
					</L>
				</Title>
				{!myPlaylist && (
					<ContainerInner>
						{playlists?.map((p) => {
							return (
								<PlayList key={p._id} onClick={() => showPlaylistSongs(p._id)}>
									<Img src={p?.photo?.url} alt="playlist Photo" />
									<Details>
										<Name>{p.name}</Name>
										<Artist>
											{songs?.songs?.filter((x) => x.playlist === p._id).length}
										</Artist>
									</Details>
								</PlayList>
							);
						})}
					</ContainerInner>
				)}
				{myPlaylist && auth?.user && (
					<>
						{myPlaylistArray && myPlaylistArray.length !== 0 ? (
							<ContainerInner>
								{myPlaylistArray.map((m) => (
									<PlayList key={m._id}>
										<Img src={m?.photo?.url} alt="playlist Photo" />
										<Details>
											<Name>{m.name}</Name>
											<Artist>
												{
													songs?.songs?.filter((x) => x.playlist === m._id)
														.length
												}
											</Artist>
										</Details>
									</PlayList>
								))}
							</ContainerInner>
						) : (
							<EmptyPlaylist>
								<GrDocumentNotes className="emptyIcon" />
								<Label>No Playlists Found</Label>
								<Button
									onClick={() => setShowCreatePlaylist(!showCreatePlaylist)}
								>
									Click here to add
								</Button>
							</EmptyPlaylist>
						)}
					</>
				)}
			</Container>
			{showCreatePlaylist && (
				<PlaylistUpload
					showCreatePlaylist={showCreatePlaylist}
					setShowCreatePlaylist={setShowCreatePlaylist}
				/>
			)}
		</>
	);
};

export default PlaylistPage;
