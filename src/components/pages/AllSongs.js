import React from "react";
import styled from "styled-components";
import { PiMusicNoteFill } from "react-icons/pi";
import banner from "../images/banner.png";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	background-color: rgba(44, 42, 42, 0.762);
	border-radius: 10px;
	width: 96%;
	padding: 10px;
	color: #fff;
`;
const Header = styled.h2`
	margin-left: 10px;
`;

const SongsContainer = styled.div`
	display: flex;
	justify-content: center;
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
const IMG = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45%;
	margin: 5px 5px 0;
	width: 80%;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	font-size: 60px;
	border: 1px solid #121212;
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
	return (
		<Container>
			<Header>All Songs</Header>
			<SongsContainer>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<IMG>
						<PiMusicNoteFill />
					</IMG>
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<IMG>
						<PiMusicNoteFill />
					</IMG>
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<IMG>
						<PiMusicNoteFill />
					</IMG>
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>

				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
				<Songs>
					<Img src={banner} />
					<Details>
						<Name>Shubh</Name>
						<Artist>fowhfdfed</Artist>
					</Details>
				</Songs>
			</SongsContainer>
		</Container>
	);
};

export default AllSongs;
