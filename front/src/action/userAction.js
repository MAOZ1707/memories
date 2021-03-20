import axios from 'axios';
import { loadingSpinner } from './loadingAction';
import { getUserAlbums } from './albumAction';

export const authSuccess = (token, userId) => {
	return {
		type: 'AUTH_SUCCESS',
		token,
		userId,
	};
};
const authFailure = (error) => {
	return {
		type: 'AUTH_ERROR',
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
			dispatch(getUserAlbums(response.data.user._id, '', ''));
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
			dispatch(getUserAlbums(response.data.user._id));
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
	console.log('log-out');
	return (dispatch) => {
		localStorage.removeItem('userData');
		dispatch({ type: 'LOG_OUT' });
		dispatch({ type: 'USER_LOGGED_OUT' });
	};
};

export const getUserFullName = () => {
	return async (dispatch, getState) => {
		const { auth } = getState();
		try {
			const response = await axios({
				url: `/api/users/${auth.userId}`,
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			});
			const responseData = await response.data;
			console.log(responseData);
			dispatch({ type: 'USER_FULL_NAME', payload: responseData });
		} catch (error) {
			console.log(error.response.data.message);
		}
	};
};
