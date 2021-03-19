import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './errorMsg.css';

const ErrorMsg = () => {
	const error = useSelector((state) => state.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (error.authErrorShow) {
			setTimeout(() => {
				dispatch({ type: 'CLEAR_AUTH_ERROR' });
			}, 8000);
		}
	});

	return (
		<>
			{error.authErrorShow && (
				<div className="error-message">{error.authError}</div>
			)}
		</>
	);
};

export default ErrorMsg;
