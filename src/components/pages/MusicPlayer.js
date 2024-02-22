import React, { useEffect, useRef, useState } from "react";
import banner from "../images/banner.png";
import { useParams } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import styled from "styled-components";
import axios from "axios";
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
	const params = useParams();
	const [songs, setSongs] = useAllSongs();
	const [songsListArray, setSongsListArray] = useState([]);
	const [playingSong, setPlayingSong] = useState({
		title: "",
		artist: "",
		current: [],
		url: "",
	});
	const [upsongs, setUpSongs] = useUpSongs();

	const PlayPause = () => {
		if (!isPlaying) {
			AudioEle.current.play();
		} else {
			AudioEle.current.pause();
		}
		setIsPlaying(!isPlaying);
	};

	const onPlaying = () => {
		saveLastPlayedSongIndex();
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

	//get all songs
	const GetAllSongs = async () => {
		// Assuming songs is an array of promises
		if (songs?.songs) {
			const updatedSongsListArray = await Promise.all(songs?.songs);
			// Set the new array to the state
			setSongsListArray(updatedSongsListArray);
		}
	};

	const SetPlayingSong = async () => {
		// Assuming songs is an array of promises
		if (songsListArray.length !== 0) {
			const lastPlayedSongIndex = localStorage.getItem("lastPlayedSongIndex");
			const lastPlayedSongProgress = localStorage.getItem(
				"lastPlayedSongProgress"
			);
			console.log(lastPlayedSongProgress);
			console.log(lastPlayedSongIndex);
			if (lastPlayedSongProgress >= 0 && lastPlayedSongIndex >= 0) {
				setPlayingSong({
					title: songsListArray[lastPlayedSongIndex].name,
					artist: songsListArray[lastPlayedSongIndex].artist,
					current: songsListArray[lastPlayedSongIndex].music.url,
					url: songsListArray[lastPlayedSongIndex].photo.url,
				});

				AudioEle.current.currentTime = lastPlayedSongProgress;
			} else {
				setPlayingSong({
					title: songsListArray[0].name,
					artist: songsListArray[0].artist,
					current: songsListArray[0].music.url,
					url: songsListArray[0].photo.url,
				});
			}
		}
	};

	const SetUpComingSong = async () => {
		const filtered = songsListArray.filter(
			(list) => list?.music?.url !== playingSong.current
		);
		setUpSongs(filtered);
		localStorage.removeItem("UpComingSongs");
		localStorage.setItem("UpComingSongs", JSON.stringify(filtered));
	};

	//lifecycle method
	useEffect(() => {
		GetAllSongs();
	}, [songs]);
	useEffect(() => {
		SetUpComingSong();
	}, [playingSong]);
	useEffect(() => {
		SetPlayingSong();
	}, [songsListArray]);

	//initalp details
	// useEffect(() => {
	// 	if (params?.slug) getSong();
	// }, [params?.slug]);

	//get single Recipe
	// const getSong = async () => {
	// 	try {
	// 		const { data } = await axios.get(
	// 			`${process.env.REACT_APP_API_BASE_URL}/api/v1/music/get-music/${params.slug}`
	// 		);
	// 		console.log(data);
	// 		setSong(data?.music);
	// 		// getSimilarRecipe(data?.music._id, data?.music?.playlist._id);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const skipBack = () => {
		const index = songsListArray.findIndex((x) => x.name === playingSong.title);

		if (index === 0) {
			setPlayingSong({
				title: songsListArray[songsListArray.length - 1].name,
				artist: songsListArray[songsListArray.length - 1].artist,
				current: songsListArray[songsListArray.length - 1].music.url,
				url: songsListArray[songsListArray.length - 1].photo.url,
			});
		} else {
			setPlayingSong({
				title: songsListArray[index - 1].name,
				artist: songsListArray[index - 1].artist,
				current: songsListArray[index - 1].music.url,
				url: songsListArray[index - 1].photo.url,
			});
		}
		AudioEle.current.currentTime = 0;
		// Add event listener for loadedmetadata
		AudioEle.current.addEventListener("loadedmetadata", () => {
			AudioEle.current.play(); // Start playing the next song
			setIsPlaying(true);
		});
	};

	const skiptoNext = () => {
		const index = songsListArray.findIndex((x) => x.name === playingSong.title);

		let nextIndex = index + 1;
		if (nextIndex >= songsListArray.length) {
			nextIndex = 0; // Wrap around to the first song if we're at the end
		}

		const nextSong = songsListArray[nextIndex];

		setPlayingSong({
			title: nextSong.name,
			artist: nextSong.artist,
			current: nextSong.music.url,
			url: nextSong.photo.url,
		});

		AudioEle.current.currentTime = 0;

		// Add event listener for loadedmetadata
		AudioEle.current.addEventListener("loadedmetadata", () => {
			AudioEle.current.play(); // Start playing the next song
			setIsPlaying(true);
		});
	};
	const onEnded = () => {
		saveLastPlayedSongIndex();
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
	const saveLastPlayedSongIndex = () => {
		const currentIndex = songsListArray.findIndex(
			(song) => song.name === playingSong.title
		);
		localStorage.setItem("lastPlayedSongIndex", currentIndex);
	};
	const saveLastPlayedSongProgress = () => {
		localStorage.setItem(
			"lastPlayedSongProgress",
			AudioEle.current.currentTime
		);
	};
	useEffect(() => {
		// Setup beforeunload event to save last played song details before page reload
		window.addEventListener("beforeunload", saveLastPlayedSongProgress);

		// Cleanup beforeunload event listener
		return () => {
			window.removeEventListener("beforeunload", saveLastPlayedSongProgress);
		};
	}, []);

	return (
		<MPlayer>
			<Img src={playingSong.url}></Img>
			<Details>
				<Title>
					<Name>{playingSong.title}</Name>
					<Artist>Song by {playingSong.artist}</Artist>
				</Title>
				{playingSong.current && (
					<Audio
						ref={AudioEle}
						src={playingSong.current}
						onTimeUpdate={onPlaying}
					></Audio>
				)}

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
