import React, { useRef, useState } from "react";
import styled from "styled-components";
import banner from "../images/banner.png";
import play from "../music/New_famous_English_songs-mc.m4a";
import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";

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
	display: flex;
	justify-content: start;
	align-items: center;
	color: #fff;
	background-color: rgba(44, 42, 42, 0.762);
	height: 280px;
	border-radius: 10px;
	width: 77%;
`;
const UpComing = styled.div`
	background-color: rgba(44, 42, 42, 0.762);
	height: 300px;
	border-radius: 10px;
	width: 20%;
`;

const Img = styled.img`
	height: 280px;
	border-radius: 10px;
	object-fit: cover;
	width: 35%;
`;
const Details = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	flex-direction: column;
	height: 100%;
	width: 65%;
`;

const Title = styled.div`
	padding-left: 20px;
`;

const Name = styled.h1`
	margin-bottom: 0;
`;
const Artist = styled.h4`
	color: rgb(130, 133, 135);
	margin-top: 10px;
`;
const Audio = styled.audio``;
const Controller = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	height: 160px;
	width: 100%;
`;
const ProgressBarController = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;
const ProgressLabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
`;
const Progress = styled.label`
	font-size: 14px;
`;
const Duration = styled.label`
	font-size: 14px;
`;
const ProgressBar = styled.div`
	height: 5px;
	background-color: #fff;
	width: 90%;
`;
const ButtonsController = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	gap: 20px;
	width: 100%;
	.Controllers {
		transition: all 0.2s ease-in-out !important;
		&:hover {
			transform: scale(1.2);
			transition: all 0.4s ease-in-out;
			filter: brightness(1);
		}
	}
`;

const VolumeController = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	left: 78%;
`;
const VolumeBar = styled.div`
	height: 3px;
	background-color: #fff;
	width: 80px;
`;
const Player = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMute, setIsMute] = useState(false);
	const [songDetails, setSongDetails] = useState({
		duration: 0,
		progress: 0,
	});
	const AudioEle = useRef();
	const PlayPause = () => {
		if (!isPlaying) {
			AudioEle.current.play();
		} else {
			AudioEle.current.pause();
		}
		setIsPlaying(!isPlaying);
	};

	const onPlaying = () => {
		const progress = Math.floor(AudioEle.current.currentTime);
		const duration = Math.floor(AudioEle.current.duration);

		const formatTime = (timeInSeconds) => {
			const minutes = Math.floor(timeInSeconds / 60);
			const seconds = Math.floor(timeInSeconds % 60);
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		};

		setSongDetails({
			duration: formatTime(duration),
			progress: formatTime(progress),
		});
	};
	const VolController = () => {
		if (isMute) {
			AudioEle.current.muted = true;
		} else {
			AudioEle.current.muted = false;
		}
		setIsMute(!isMute);
	};
	return (
		<Container>
			<ControllerSection>
				<MusicPlayer>
					<Img src={banner}></Img>
					<Details>
						<Title>
							<Name>Okay Okay Okay</Name>
							<Artist>Artist</Artist>
						</Title>
						<Audio ref={AudioEle} src={play} onTimeUpdate={onPlaying}></Audio>
						<Controller>
							<ProgressBarController>
								<ProgressLabelContainer>
									<Progress>{songDetails.progress}</Progress>
									<Duration>{songDetails.duration}</Duration>
								</ProgressLabelContainer>
								<ProgressBar />
							</ProgressBarController>
							<ButtonsController>
								<FaBackward className="Controllers" size={25} />
								{isPlaying && (
									<IoIosPause
										className="Controllers"
										size={50}
										onClick={() => PlayPause()}
									/>
								)}
								{!isPlaying && (
									<IoPlay
										className="Controllers"
										size={50}
										onClick={() => PlayPause()}
									/>
								)}
								<FaForward className="Controllers" size={25} />
								<VolumeController>
									<VolumeBar></VolumeBar>
									{!isMute && (
										<HiSpeakerXMark
											className="Controllers"
											onClick={() => VolController()}
										/>
									)}
									{isMute && (
										<HiSpeakerWave
											className="Controllers"
											onClick={() => VolController()}
										/>
									)}
								</VolumeController>
							</ButtonsController>
						</Controller>
					</Details>
				</MusicPlayer>
				<UpComing></UpComing>
			</ControllerSection>
		</Container>
	);
};

export default Player;
