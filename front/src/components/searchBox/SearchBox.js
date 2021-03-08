import React from 'react';
import { Link } from 'react-router-dom';

import './search.style.css';

const SearchBox = ({ SearchMode }) => {
	return (
		<div className="header">
			{SearchMode ? (
				<input type="text" className="search-input" />
			) : (
				<div className="app-title">
					<Link to={'/albums'}>Memories</Link>
				</div>
			)}
		</div>
	);
};

export default SearchBox;
