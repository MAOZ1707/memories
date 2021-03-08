import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './errorMsg.css';

const ErrorMsg = () => {
	const error = useSelector((state) => state.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (error.isOpen) {
			setTimeout(() => {
				dispatch({ type: 'CLEAR_ERROR' });
			}, 8000);
		}
	});

	return (
		<>{error.isOpen && <div className="error-message">{error.error}</div>}</>
	);
};

export default ErrorMsg;
