import React from 'react';

import './button.style.css';

const Button = (props) => {
	return (
		<button
			className={`
      ${props.danger && 'btn-danger'} 
      ${props.success && 'btn-success'}
      ${props.link && 'btn-link'} 
      ${props.submit && 'btn-submit'} `}
		>
			{props.children}
		</button>
	);
};

export default Button;
