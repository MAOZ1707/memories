import axios from 'axios';
import { loadingSpinner } from './loadingAction';

export const authSuccess = (token, userId) => {
	return {
		type: 'AUTH_SUCCESS',
		token,
		userId,
	};
};
const authFailure = (error) => {
	return {
		type: 'ERROR',
		error,
	};
};

export const signUp = ({ ...values }) => {
	return async (dispatch) => {
		dispatch(loadingSpinner(true, 'AUTH_LOADING'));
		try {
			const fetchData = await axios({
				method: 'POST',
				url: 'http://localhost:4000/api/users/signup',
				data: {
					firstname: values.firstname,
					lastname: values.lastname,
					email: values.email,
					password: values.password,
				},
			});
			const response = await fetchData;

			localStorage.setItem(
				'userData',
				JSON.stringify({
					token: response.data.token,
					userId: response.data.user._id,
				})
			);

			dispatch(loadingSpinner(false, 'AUTH_LOADING'));
			dispatch(authSuccess(response.data.token, response.data.user._id));
		} catch (error) {
			if (error.response.data) {
				dispatch(loadingSpinner(false));
				dispatch(authFailure(error.response.data.message));
			}
		}
	};
};

export const logIn = ({ ...values }) => {
	return async (dispatch) => {
		dispatch(loadingSpinner(true, 'AUTH_LOADING'));
		try {
			const fetchData = await axios({
				method: 'POST',
				url: 'http://localhost:4000/api/users/login',
				data: {
					email: values.email,
					password: values.password,
				},
			});
			const response = await fetchData;
			localStorage.setItem(
				'userData',
				JSON.stringify({
					token: response.data.token,
					userId: response.data.user._id,
				})
			);

			dispatch(loadingSpinner(false, 'AUTH_LOADING'));
			dispatch(authSuccess(response.data.token, response.data.user._id));
		} catch (error) {
			dispatch(loadingSpinner(false, 'AUTH_LOADING'));
			dispatch(authFailure(error.response.data.message));
		}
	};
};

export const authCheck = () => {
	return (dispatch) => {
		const storageData = JSON.parse(localStorage.getItem('userData'));
		if (!storageData) {
			localStorage.removeItem('userData');
		} else {
			const { token } = storageData;
			const { userId } = storageData;
			dispatch(authSuccess(token, userId));
		}
	};
};

export const logOut = () => {
	localStorage.removeItem('userData');
	return { type: 'LOG_OUT' };
};
