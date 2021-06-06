const initialState = {
	searchTerm: '',
}

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SEARCH_MODE':
			return {
				...state,
				searchTerm: action.payload,
			}

		default:
			return state
	}
}
