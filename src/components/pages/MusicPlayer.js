import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { FaForward, FaBackward } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useAllSongs } from "../../context/SongsProvider";
import { useUpSongs } from "../../context/upcomingSongsProvider";

const MPlayer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	color: #fff;
	background-color: rgba(44, 42, 42, 0.762);
	height: 280px;
	border-radius: 10px;
	width: 77%;
	@media (max-width: 640px) {
		flex-direction: column;
		width: 95%;
		height: fit-content;
	}
`;

const Img = styled.img`
	height: 280px;
	border-radius: 10px;
	object-fit: cover;
	width: 35%;
	@media (max-width: 640px) {
		width: 95%;
		height: 200px;
		margin-top: 10px;
	}
`;
const Details = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	flex-direction: column;
	height: 100%;
	width: 65%;
	@media (max-width: 640px) {
		width: 100%;
		height: 200px;
	}
`;

const Title = styled.div`
	padding-left: 20px;
`;

const Name = styled.h1`
	margin-bottom: 0;
	@media (max-width: 640px) {
		margin-top: 5px;
		font-size: 28px;
	}
`;
const Artist = styled.h4`
	color: rgb(130, 133, 135);
	margin-top: 10px;
	@media (max-width: 640px) {
		margin-top: 5px;
		font-size: 15px;
	}
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
	height: 7px;
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
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 0.5rem;
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
	left: 73%;
	@media (max-width: 640px) {
		left: 86%;
	}
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
	@media (max-width: 640px) {
		display: none;
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
	const [vLevel, setVLevel] = useState(100); // Set default volume level
	const clickRef = useRef();
	const volRef = useRef();
	const params = useParams();
	const [songs, setSongs] = useAllSongs();
	const [songsListArray, setSongsListArray] = useState([]);
	const [playingSong, setPlayingSong] = useState({
		title: "",
		artist: "",
		current: "",
		url: "",
	});
	const [upsongs, setUpSongs] = useUpSongs();
	const navigate = useNavigate();

	//get all songs
	const GetAllSongs = async () => {
		// Assuming songs is an array of promises
		if (songs?.songs) {
			const updatedSongsListArray = await Promise.all(songs?.songs);
			// Set the new array to the state
			setSongsListArray(updatedSongsListArray);
			setUpSongs(updatedSongsListArray);
		}
	};

	const PlayPause = () => {
		if (!isPlaying) {
			AudioEle.current.play();
		} else {
			AudioEle.current.pause();
		}
		setIsPlaying(!isPlaying);
	};

	const onPlaying = () => {
		saveLastPlayedSong();
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

	const SetPlayingSong = async () => {
		if (songsListArray.length !== 0) {
			// Function to play the last played song

			const lastPlayedSongIndex = localStorage.getItem("lastPlayedSongIndex");
			const lastPlayedSongProgress = localStorage.getItem(
				"lastPlayedSongProgress"
			);

			if (lastPlayedSongIndex !== null && lastPlayedSongProgress !== null) {
				playSong(lastPlayedSongIndex);
				AudioEle.current.currentTime = lastPlayedSongProgress;
			} else {
				playSong(0);
			}
		}
	};

	const playSong = (index) => {
		if (index >= 0 && index < songsListArray.length) {
			const remainingSongs = songsListArray.slice(index + 1); // Get elements from index + 1 to the end
			const removedSongs = songsListArray.slice(0, index);
			const newOrder = remainingSongs.concat(removedSongs); // Concatenate sliced elements with remaining elements
			setPlayingSong({
				title: songsListArray[index].name,
				artist: songsListArray[index].artist,
				current: songsListArray[index].music.url,
				url: songsListArray[index].photo.url,
			});
			if (newOrder) {
				setUpSongs(newOrder);
			}
		}
	};

	//previous song
	const skipBack = () => {
		const index = songsListArray.findIndex((x) => x.name === playingSong.title);
		if (index === 0) {
			playSong(songsListArray.length - 1);
		} else {
			playSong(index - 1);
		}
		AudioEle.current.currentTime = 0;
		// Add event listener for loadedmetadata
		AudioEle.current.addEventListener("loadedmetadata", () => {
			AudioEle.current.play(); // Start playing the next song
			setIsPlaying(true);
		});
	};

	//next song
	const skiptoNext = () => {
		const index = songsListArray.findIndex((x) => x.name === playingSong.title);

		let nextIndex = index + 1;
		if (nextIndex >= songsListArray.length) {
			nextIndex = 0; // Wrap around to the first song if we're at the end
		}

		playSong(nextIndex);

		AudioEle.current.currentTime = 0;

		// Add event listener for loadedmetadata
		AudioEle.current.addEventListener("loadedmetadata", () => {
			AudioEle.current.play(); // Start playing the next song
			setIsPlaying(true);
		});
	};

	//to auto slip to next song
	const onEnded = () => {
		skiptoNext();
	};

	// Add event listener for ended
	useEffect(() => {
		if (AudioEle.current) {
			AudioEle.current.addEventListener("ended", onEnded);
		}

		// Clean up event listener on unmount
		return () => {
			if (AudioEle.current) {
				AudioEle.current.removeEventListener("ended", onEnded);
			}
		};
	}, [playingSong]);

	// Function to save last played song details to local storage
	const saveLastPlayedSong = () => {
		const currentIndex = songsListArray.findIndex(
			(song) => song.name === playingSong.title
		);
		localStorage.setItem("lastPlayedSongIndex", currentIndex);

		localStorage.setItem(
			"lastPlayedSongProgress",
			AudioEle.current.currentTime
		);
	};

	//inital details
	useEffect(() => {
		// if (params?.slug) getSong();
		if (params?.slug) {
			const normalizeString = (str) => str.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
			const index = songsListArray.findIndex(
				(x) =>
					normalizeString(x.name) === normalizeString(params.slug.toString())
			);
			playSong(index);
			if (AudioEle.current) {
				AudioEle.current.currentTime = 0;
				// Add event listener for loadedmetadata
				AudioEle.current.addEventListener("loadedmetadata", () => {
					if (isPlaying) {
						AudioEle.current.play();
						setIsPlaying(true);
						navigate("/");
					}
				});
				navigate("/");
			}
		}
	}, [params?.slug]);

	//lifecycle method
	useEffect(() => {
		GetAllSongs();
	}, [songs]);

	useEffect(() => {
		SetPlayingSong();
	}, [songsListArray]);

	return (
		<MPlayer>
			<Img src={playingSong.url}></Img>
			<Details>
				<Title>
					<Name>{playingSong.title}</Name>
					<Artist>Song by {playingSong.artist}</Artist>
				</Title>
				<Audio
					ref={AudioEle}
					src={playingSong.current}
					onTimeUpdate={onPlaying}
				></Audio>

				<Controller>
					<ProgressBarController>
						<ProgressLabelContainer>
							<Progress>{songDetails.progress}</Progress>
							<Duration>{songDetails.duration}</Duration>
						</ProgressLabelContainer>
						<ProgressBar onClick={checkWidth} ref={clickRef}>
							<SeekBar style={{ width: `${fill.filling}%` }}></SeekBar>
						</ProgressBar>
					</ProgressBarController>
					<ButtonsController>
						<FaBackward className="Controllers" size={25} onClick={skipBack} />
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
						<FaForward className="Controllers" size={25} onClick={skiptoNext} />
						<VolumeController>
							<VolumeBar
								className="Controllers"
								onClick={volContoller}
								ref={volRef}
							>
								<VolSeekBar
									style={{
										width: `${vLevel}%`,
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
