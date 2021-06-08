const initialState = {
	error: null,
	isOpen: false,
	authError: null,
	authErrorShow: false,
}

export const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ERROR':
			return {
				...state,
				error: action.error,
				isOpen: true,
			}
		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
				isOpen: false,
			}
		case 'AUTH_ERROR':
			return {
				...state,
				authError: action.error,
				authErrorShow: true,
			}
		case 'CLEAR_AUTH_ERROR':
			return {
				...state,
				authError: null,
				authErrorShow: false,
			}
		default:
			return state
	}
}
