import React from "react";
import PlaylistPage from "./PlaylistPage";
import HomeControlPage from "./HomeControlPage";
import styled from "styled-components";
import MusicPage from "./MusicPage";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	padding: 10px;
	background-color: #000;
`;

const LeftContainer = styled.div`
	position: relative;
	width: 19.7%;
	height: 50vh;
	@media (max-width: 640px) {
		display: none;
	}
`;
const LeftFixed = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 10px;
	width: inherit;
	top: 10px;
`;
const RightContainer = styled.div`
	width: 80%;
	top: 10px;
	@media (max-width: 640px) {
		width: 100%;
	}
`;

const Home = () => {
	return (
		<Container>
			<LeftContainer>
				<LeftFixed>
					{" "}
					<HomeControlPage />
					<PlaylistPage />
				</LeftFixed>
			</LeftContainer>
			<RightContainer>
				<MusicPage />
			</RightContainer>
		</Container>
	);
};

export default Home;
