import React from 'react';
import './studioFilter.css';

const FiltersBarItem = ({ name, active, handleClick }) => {
	return (
		<button
			className={`filter-bar-items ${active && 'active'} `}
			onClick={handleClick}
		>
			{name}
		</button>
	);
};

export default FiltersBarItem;
