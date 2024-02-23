import React from "react";
// import { useSearch } from "../../context/searchProvider";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export const SearchInput = () => {
	// const [values, setValues] = useState(0);
	// const location = useLocation();
	// const navigate = useNavigate();
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const { data } = await axios.get(
	// 			`${process.env.REACT_APP_API_BASE_URL}/api/v1/food/search/${values.keyword}`
	// 		);
	// 		setValues({ ...values, results: data });
	// 		navigate("/search");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const ResetVlaues = () => {
	// 	if (location.pathname !== "/search")
	// 		setValues({ ...values, keyword: "", results: [] });
	// };

	// useEffect(() => {
	// 	ResetVlaues();
	// }, [location]);

	return (
		<Div>
			<Form role="search">
				<IoIosSearch size={16} />
				<Input
					className="custom-input"
					type="search"
					placeholder="Search..."
					aria-label="Search"
					// value={values.keyword}
					// onChange={(e) => setValues({ ...values, keyword: e.target.value })}
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
