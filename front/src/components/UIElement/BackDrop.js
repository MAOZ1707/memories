import React from 'react';
import ReactDOM from 'react-dom';

import './backDrop.style.css';

const BackDrop = (props) => {
	return ReactDOM.createPortal(
		<div
			className="backdrop"
			onClick={props.onClick}
			role="button"
			onKeyPress={props.onKeyPress}
			tabIndex={0}
		></div>,
		document.getElementById('backdrop-bg')
	);
};

export default BackDrop;
