import React from "react";
import styled from "styled-components";
import MusicPlayer from "./MusicPlayer";
import UpComingSongs from "./UpComingSongs";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	width: 100%;
`;

const ControllerSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	width: 100%;
`;

const Player = () => {
	return (
		<Container>
			<ControllerSection>
				<MusicPlayer />
				<UpComingSongs />
			</ControllerSection>
		</Container>
	);
};

export default Player;
