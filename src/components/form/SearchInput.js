import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { usePlaylistSongs } from "../../context/playlistSongsProvider";
import toast from "react-hot-toast";

export const SearchInput = () => {
	const [playlistSongs, setPlaylistSoongs] = usePlaylistSongs();
	const [values, setValues] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/api/v1/music/search/${values}`
			);
			if (data.length !== 0) {
				setPlaylistSoongs({
					playlist: `Found ${data.length} `,
					songs: data,
				});
			} else {
				toast.error("Nothing Found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Div>
			<Form role="search" onSubmit={handleSubmit}>
				<IoIosSearch />
				<Input
					className="custom-input"
					type="search"
					placeholder="Search..."
					aria-label="Search"
					onChange={(e) => setValues(e.target.value)}
				/>
			</Form>
		</Div>
	);
};

const Div = styled.div`
	margin-left: 20px;
`;
const Form = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 22px;
	border: 2px solid rgba(44, 42, 42, 0.762);
	height: 40px;
	padding: 0 15px;
	@media (max-width: 640px) {
		display: none;
	}
	@media (max-width: 1120px) {
		margin-right: 40px;
	}
`;
const Input = styled.input`
	color: #fff;
	background: transparent;
	border: none;
	outline: none;
	font-weight: bold;
	font-size: 16px;
	width: 400px;
	margin-left: 5px;
	letter-spacing: 0.5px;
	padding: 0 0 0 2px;
	&.custom-input::placeholder {
		color: rgb(170, 165, 165);
	}
`;
