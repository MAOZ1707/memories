const initialState = {
	error: null,
	isOpen: false,
};

export const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ERROR':
			console.log(action);
			return {
				...state,
				error: action.error,
				isOpen: true,
			};
		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
				isOpen: false,
			};
		default:
			return state;
	}
};
