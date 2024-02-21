import React from "react";
import styled from "styled-components";
import { GiBookshelf } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { PiMusicNoteFill } from "react-icons/pi";

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
`;
const Title = styled.div`
	background-color: rgba(44, 42, 42, 0.762);
	border-radius: 3rem;
	padding-inline: 0.9rem;
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
	justify-content: center;
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
const Img = styled.div`
	border: 1px solid #fff;
	padding: 7px 8px 5px;
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

const PlaylistPage = () => {
	return (
		<Container>
			<Header>
				<Label>
					<GiBookshelf />
					Your Library
				</Label>
				<FaPlus />
			</Header>
			<Title>
				<Label>Playlist</Label>
			</Title>
			<ContainerInner>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
				<PlayList>
					<Img>
						<PiMusicNoteFill />
					</Img>
					<Details>
						<Name>aaaaaa</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</PlayList>
			</ContainerInner>
		</Container>
	);
};

export default PlaylistPage;
