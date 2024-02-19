import React from "react";
import styled from "styled-components";

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
const MusicPlayer = styled.div`
	background-color: rgba(44, 42, 42, 0.762);
	height: 300px;
	border-radius: 10px;
	width: 77%;
`;
const UpComing = styled.div`
	background-color: rgba(44, 42, 42, 0.762);
	height: 300px;
	border-radius: 10px;
	width: 20%;
`;
const Player = () => {
	return (
		<Container>
			<ControllerSection>
				<MusicPlayer></MusicPlayer>
				<UpComing></UpComing>
			</ControllerSection>
		</Container>
	);
};

export default Player;
