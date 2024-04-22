import React from "react";
import styled from "styled-components";
import MusicPlayer from "./MusicPlayer";
import UpComingSongs from "./UpComingSongs";
import AllSongs from "./AllSongs";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

const ControllerSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	width: 100%;
	@media (max-width: 640px) {
		flex-direction: column;
	}
`;

const Player = () => {
	return (
		<Container>
			<ControllerSection>
				<MusicPlayer />
				<UpComingSongs />
			</ControllerSection>
			<AllSongs />
		</Container>
	);
};

export default Player;
