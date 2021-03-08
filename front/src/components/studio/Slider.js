import React from 'react';
import './studioFilter.css';

const Slider = ({ min, max, value, handleChange }) => {
	return (
		<div className="slider-container">
			<input
				type="range"
				className="input-slider"
				min={min}
				value={value}
				onChange={handleChange}
				max={max}
			/>
		</div>
	);
};

export default Slider;
