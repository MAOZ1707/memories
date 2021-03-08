import React from 'react';

import './card.style.css';

const Card = ({ children, className }) => {
	return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
