import React from 'react';

import './appLogo.style.css';

const AppLogo = ({ handleClick }) => {
	return (
		<button className="app-logo-style" onClick={handleClick}>
			<div className="balls-wrapper">
				<div className="ball-1"></div>
				<div className="ball-2"></div>
				<div className="ball-3"></div>
			</div>
		</button>
	);
};

export default AppLogo;
