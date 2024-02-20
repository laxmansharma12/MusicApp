import React, { useRef, useState } from "react";
import banner from "../images/banner.png";
import play from "../music/New_famous_English_songs-mc.m4a";
import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import styled from "styled-components";

const MPlayer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	color: #fff;
	background-color: rgba(44, 42, 42, 0.762);
	height: 280px;
	border-radius: 10px;
	width: 77%;
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
	background-color: rgb(130, 133, 135);
	width: 90%;
	border-radius: 30px;
	cursor: pointer;
`;
const SeekBar = styled.div`
	height: 100%;
	background-color: #fff;
	border-radius: 30px;
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
	gap: 10px;
	left: 78%;
`;
const VolumeBar = styled.div`
	height: 4px;
	background-color: rgb(130, 133, 135);
	width: 80px;
	border-radius: 30px;
	cursor: pointer;
	&:hover {
		height: 5px;
	}
`;

const VolSeekBar = styled.div`
	height: 100%;
	background-color: #fff;
	border-radius: 30px;
`;

const MusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMute, setIsMute] = useState(false);
	const [songDetails, setSongDetails] = useState({
		duration: 0,
		progress: 0,
	});
	const [fill, setFill] = useState({ filling: 0, length: 0 });
	const AudioEle = useRef();
	const [vLevel, setVLevel] = useState();
	const clickRef = useRef();
	const volRef = useRef();

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

		setFill({
			filling: (progress / duration) * 100,
			length: duration,
		});
	};
	const VolController = () => {
		if (!isMute) {
			AudioEle.current.muted = true;
		} else {
			AudioEle.current.muted = false;
		}
		setIsMute(!isMute);
	};
	const checkWidth = (e) => {
		let width = clickRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;

		const divprogress = (offset / width) * 100;
		AudioEle.current.currentTime = (divprogress / 100) * fill.length;
	};
	const volContoller = (e) => {
		let width = volRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;

		const divprogress = (offset / width) * 100;
		setVLevel(divprogress);
		AudioEle.current.volume = divprogress / 100;
	};
	return (
		<MPlayer>
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
						<ProgressBar onClick={checkWidth} ref={clickRef}>
							<SeekBar style={{ width: `${fill.filling + "%"}` }}></SeekBar>
						</ProgressBar>
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
							<VolumeBar
								className="Controllers"
								onClick={volContoller}
								ref={volRef}
							>
								<VolSeekBar
									style={{
										width: `${vLevel + "%"}`,
									}}
								></VolSeekBar>
							</VolumeBar>
							{isMute && (
								<HiSpeakerXMark
									className="Controllers"
									onClick={() => {
										VolController();
									}}
								/>
							)}
							{!isMute && (
								<HiSpeakerWave
									className="Controllers"
									onClick={() => {
										VolController();
									}}
								/>
							)}
						</VolumeController>
					</ButtonsController>
				</Controller>
			</Details>
		</MPlayer>
	);
};

export default MusicPlayer;
