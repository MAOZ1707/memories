import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbums } from '../../action/albumAction';
import './search.style.css';

const SearchBox = ({ open }) => {
	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state.auth);
	const [input, setInput] = useState('');
	const [active, setActive] = useState(false);

	let inputRef = useRef();

	const inputChange = (e) => {
		setInput(e.target.value);
	};
	const activeSearch = () => {
		setActive((active) => !active);
		inputRef.current.focus();
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			dispatch(getUserAlbums(userId, 'title', input));
		}, 500);
		return () => clearTimeout(debounce);
	}, [dispatch, input, userId]);

	return (
		<div className="search-box">
			<button
				className="search-btn"
				aria-label="submit search"
				onClick={activeSearch}
			>
				{!active ? (
					<img
						alt="open-search"
						src="https://img.icons8.com/ios/50/000000/search--v1.png"
					/>
				) : (
					<img
						alt="close-search"
						src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png"
					/>
				)}
			</button>
			<input
				type="text"
				className={`search-input ${active && 'active'}`}
				aria-label="search"
				ref={inputRef}
				placeholder="search album"
				onChange={inputChange}
			/>
		</div>
	);
};

export default SearchBox;
