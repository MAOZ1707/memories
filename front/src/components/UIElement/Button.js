import React from 'react';

import './button.style.css';

const Button = (props) => {
	return (
		<button
			className={`
      ${props.danger && 'btn-danger'} 
      ${props.back && 'btn-back'} 
      ${props.edit && 'btn-edit'}
      ${props.link && 'btn-link'} 
      ${props.cancel && 'btn-cancel'} 
      ${props.images && 'btn-images'} 
      ${props.submit && 'btn-submit'} `}
			onClick={props.onClick}
			type={props.type}
		>
			{props.back && (
				<img
					src="https://img.icons8.com/ios/50/000000/left.png"
					alt="back-btn"
				/>
			)}
			{props.children}
		</button>
	);
};

export default Button;
