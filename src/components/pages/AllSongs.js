import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAllSongs } from "../../context/SongsProvider";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	display: flex;
	justify-content: center;
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
const Header = styled.h2`
	margin: 0 0 15px 10px;
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
		justify-content: center;
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
		width: 147px;
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
			<Header>All Songs</Header>
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
		</Container>
	);
};

export default AllSongs;
