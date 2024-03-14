import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAllSongs } from "../../context/SongsProvider";
import { useNavigate } from "react-router-dom";
import { usePlaylistSongs } from "../../context/playlistSongsProvider";
import { FaArrowLeft } from "react-icons/fa6";
import PlaylistPage from "./PlaylistPage";

const Container = styled.div`
	display: flex;
	justify-content: start;
	align-items: start;
	flex-direction: column;
	background-color: rgba(44, 42, 42, 0.762);
	border-radius: 10px;
	width: 96%;
	min-height: 44vh;
	padding: 10px;
	margin-bottom: 10px;
	color: #fff;
	@media (max-width: 640px) {
		width: 90%;
	}
`;

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
`;

const Header = styled.h3`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin: 10px 0 15px 10px;
	.GoBack {
		&:hover {
			color: rgb(160, 202, 240);
		}
	}
	@media (max-width: 640px) {
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
	}
`;

const Select = styled.select`
	background-color: rgba(44, 42, 42, 0.762);
	border-radius: 3rem;
	padding-inline: 0.7rem;
	padding-block: 0.5rem;
	border: none;
	color: #fff;
	font-size: 1.17rem;
	cursor: pointer;
	outline: none;
	font-weight: bold;
	margin-right: 0.5rem;
	transition: 0.2s ease-in-out;
	&:hover {
		background-color: #383636;
	}
`;
const Option = styled.option`
	border: none;
	outline: none;
`;

const SongsContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-wrap: wrap;
	padding-left: 8px;
	gap: 10px;
	width: 100%;
	@media (max-width: 640px) {
		justify-content: space-around;
		padding: 0;
	}
`;
const Songs = styled.div`
	display: flex;
	justify-content: start;
	align-items: start;
	flex-direction: column;
	background-color: #000;
	border-radius: 10px;
	gap: 10px;
	height: 155px;
	width: 155px;
	@media (max-width: 640px) {
		width: 148px;
		height: 150px;
		gap: 5px;
	}
`;
const Img = styled.img`
	height: 50%;
	width: 90%;
	object-fit: fill;
	border-top-right-radius: 15%;
	border-top-left-radius: 15%;
	padding: 7px 8px 5px;
`;

const Name = styled.label`
	font-weight: bold;
`;
const Artist = styled.label`
	color: rgb(130, 133, 135);
	font-size: 12px;
	font-weight: 600;
`;
const Details = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	margin-left: 10px;
	flex-direction: column;
`;

const AllSongs = () => {
	const [songs, setSongs] = useAllSongs();
	const [songsListArray, setSongsListArray] = useState([]);
	const [playlistSongs, setPlaylistSongs] = usePlaylistSongs();
	const [showPlaylist, setShowPlaylist] = useState(true);
	const navigate = useNavigate();

	//get all recipes
	const GetAllSongs = async () => {
		const updatedRecipesListArray = songs?.songs;

		// Set the new array to the state
		setSongsListArray(updatedRecipesListArray);
	};

	//lifecycle method
	useEffect(() => {
		GetAllSongs();
	}, [songs]);
	return (
		<Container>
			{playlistSongs && playlistSongs?.songs?.length === 0 ? (
				<>
					<HeaderContainer>
						<Header onClick={() => setShowPlaylist(true)}>All Songs</Header>
						<Header onClick={() => setShowPlaylist(!showPlaylist)}>
							Playlists
						</Header>
					</HeaderContainer>
					{showPlaylist ? (
						<SongsContainer>
							{songsListArray?.map((s) => (
								<Songs key={s._id} onClick={() => navigate(`/${s.slug}`)}>
									<Img src={s?.photo?.url} alt="song Photo" />
									<Details>
										<Name>{s.name}</Name>
										<Artist>{s.artist.substring(0, 20)}...</Artist>
									</Details>
								</Songs>
							))}
						</SongsContainer>
					) : (
						<PlaylistPage />
					)}
				</>
			) : (
				<>
					<Header>
						<FaArrowLeft
							className="GoBack"
							onClick={() => setPlaylistSongs({ playlist: "", songs: [] })}
						/>
						{playlistSongs.playlist}
					</Header>
					<SongsContainer>
						{playlistSongs?.songs?.map((p) => (
							<Songs
								key={p._id}
								onClick={() => navigate(`/${p.slug}/${p.playlist}`)}
							>
								<Img src={p?.photo?.url} alt="song Photo" />
								<Details>
									<Name>{p.name}</Name>
									<Artist>{p.artist.substring(0, 20)}...</Artist>
								</Details>
							</Songs>
						))}
					</SongsContainer>
				</>
			)}
		</Container>
	);
};

export default AllSongs;
