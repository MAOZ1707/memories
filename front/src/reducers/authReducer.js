const initialState = {
	isLogin: false,
	token: null,
	userId: null,
	isLoading: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'AUTH_FAILED':
			return {
				...state,
				isLogin: false,
			};
		case 'AUTH_SUCCESS':
			return {
				...state,
				isLogin: true,
				userId: action.userId,
				token: action.token,
			};
		case 'LOG_OUT':
			return {
				...state,
				isLogin: false,
				userId: null,
				token: null,
			};
		case 'AUTH_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};
