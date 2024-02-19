import React from "react";
import PlaylistPage from "./pages/PlaylistPage";
import HomeControlPage from "./pages/HomeControlPage";
import styled from "styled-components";
import MusicPage from "./pages/MusicPage";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	padding: 10px;
	background-color: #000;
`;

const LeftContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	gap: 10px;
	/* border: 1px solid red; */
	width: 20%;
`;
const RightContainer = styled.div`
	width: 80%;
`;

const Home = () => {
	return (
		<Container>
			<LeftContainer>
				<HomeControlPage />
				<PlaylistPage />
			</LeftContainer>
			<RightContainer>
				<MusicPage />
			</RightContainer>
		</Container>
	);
};

export default Home;
