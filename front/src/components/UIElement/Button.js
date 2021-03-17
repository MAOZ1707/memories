import React from 'react';

import './button.style.css';

const Button = (props) => {
	return (
		<button
			className={`
      ${props.danger && 'btn-danger'} 
      ${props.edit && 'btn-edit'}
      ${props.link && 'btn-link'} 
      ${props.cancel && 'btn-cancel'} 
      ${props.images && 'btn-images'} 
      ${props.submit && 'btn-submit'} `}
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
};

export default Button;
