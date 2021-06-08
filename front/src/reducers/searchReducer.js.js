const initialState = {
	searchTerm: '',
	searchLike: null,
}

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SEARCH_MODE':
			return {
				...state,
				searchTerm: action.payload,
			}
		case 'SEARCH_LIKE':
			return {
				...state,
				searchLike: action.payload,
			}
		default:
			return state
	}
}
