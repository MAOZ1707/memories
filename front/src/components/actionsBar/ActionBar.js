import React from 'react';
import { Link } from 'react-router-dom';
import './actionBar.style.css';

import ReactTooltip from 'react-tooltip';

const ActionBar = ({ albumId }) => {
	return (
		<div className="action-bar-wrapper">
			<ReactTooltip effect="solid" place="bottom" />
			<button className="action-bar-upload-btn" data-tip="Upload images">
				<Link to={`/album/${albumId}/images/upload`}>
					<img
						src="https://img.icons8.com/ios/50/000000/add-image.png"
						alt="upload"
					/>
				</Link>
			</button>
			<ReactTooltip effect="solid" place="bottom" />
			<button className="action-bar-cinema-btn" data-tip="Cinema view">
				<Link to={`/album/${albumId}/images/cinema`}>
					<img
						src="https://img.icons8.com/ios/50/000000/image-gallery.png"
						alt="cinema"
					/>
				</Link>
			</button>
		</div>
	);
};

export default ActionBar;
