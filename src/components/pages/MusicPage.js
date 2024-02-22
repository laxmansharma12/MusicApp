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
	border-radius: 10px;
	@media (max-width: 640px) {
		width: 100%;
	}
`;
const Nav = styled.div`
	position: relative;
	height: 60px;
	width: 100%;
	position: sticky;
	position: -webkit-sticky;
	top: 0px;
	@media (max-width: 640px) {
		display: none;
	}
`;
const MusicPage = () => {
	return (
		<Container>
			<Nav>
				<Navbar />
			</Nav>
			<Player />
		</Container>
	);
};

export default MusicPage;
