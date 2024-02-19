import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Player from "./Player";

const Container = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	background-color: #121212;
	height: 97vh;
	border-radius: 10px;
`;

const MusicPage = () => {
	return (
		<Container>
			<Navbar />
			<Player />
		</Container>
	);
};

export default MusicPage;
