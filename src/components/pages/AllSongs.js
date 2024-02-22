import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAllSongs } from "../../context/SongsProvider";

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
`;
const Header = styled.h2`
	margin-left: 10px;
`;

const SongsContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	width: 100%;
`;
const Songs = styled.div`
	display: flex;
	justify-content: start;
	align-items: start;
	flex-direction: column;
	background-color: #000;
	border-radius: 10px;
	gap: 10px;
	height: 150px;
	width: 150px;
`;
const Img = styled.img`
	height: 50%;
	width: 90%;
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
					<Songs key={s._id} onClick={() => `/${s.slug}`}>
						<Img src={s?.photo?.url} alt="song Photo" />
						<Details>
							<Name>{s.name}</Name>
							<Artist>{s.artist}</Artist>
						</Details>
					</Songs>
				))}
			</SongsContainer>
		</Container>
	);
};

export default AllSongs;
