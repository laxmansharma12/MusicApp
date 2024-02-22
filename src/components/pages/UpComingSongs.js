import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import styled from "styled-components";
import { useUpSongs } from "../../context/upcomingSongsProvider";
import { useNavigate } from "react-router-dom";

const UpComing = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 10px;
	background-color: rgba(44, 42, 42, 0.762);
	height: 280px;
	border-radius: 10px;
	width: 20%;
	color: #fff;
	@media (max-width: 640px) {
		width: 95%;
		gap: 0;
		height: fit-content;
	}
`;
const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	width: 85%;
	padding: 0 15px;
	cursor: pointer;
	font-weight: bold;
`;
const Label = styled.label``;

const ContainerInner = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 13px;
	width: 85%;
	height: 200px;
	margin-left: 15px;
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
	@media (max-width: 640px) {
		height: 100px;
		justify-content: start;
	}
`;

const Song = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	gap: 10px;
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

const UpComingSongs = () => {
	const [upsongs, setUpSongs] = useUpSongs();
	const navigate = useNavigate();
	return (
		<UpComing>
			<Title>
				<Label>Up Coming</Label>
				<IoArrowForwardOutline />
			</Title>
			<ContainerInner>
				{upsongs?.map((s) => (
					<Song key={s._id} onClick={() => navigate(`/${s.slug}`)}>
						<Img src={s?.photo?.url} alt="song Photo" />
						<Details>
							<Name>{s.name}</Name>
							<Artist>{s.artist}</Artist>
						</Details>
					</Song>
				))}
			</ContainerInner>
		</UpComing>
	);
};

export default UpComingSongs;
