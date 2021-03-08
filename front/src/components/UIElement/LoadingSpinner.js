import React from 'react';
import './loading.style.css';

const LoadingSpinner = (props) => {
	return (
		<div
			className={`loader ${props.overlay && 'loader--overlay'} ${
				props.center && 'loader--center'
			}`}
		>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default LoadingSpinner;
