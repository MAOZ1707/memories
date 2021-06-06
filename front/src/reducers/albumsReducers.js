const initialState = {
	albums: [],
	album: {},
	isLoading: false,
	status: null,
};

export const albumsReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_ALBUMS':
			return {
				...state,
				albums: action.payload,
				status: null,
			};
		case 'GET_ALBUM':
			return {
				...state,
				album: action.payload,
			};
		case 'ALBUMS_LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'DELETE_ALBUM':
			return {
				...state,
				albums: state.albums.filter((album) => album._id !== action.albumId),
			};
		case 'LIKE_ALBUM':
			return {
				...state,
				albums: state.albums.map((album) => (album._id === action.payload._id ? action.payload : album)),
			};
		case 'UPDATE_ALBUM':
			return {
				...state,
				albums: state.albums.map((album) => (album._id === action.payload._id ? action.payload : album)),
			};
		case 'CREATE_ALBUM':
			return {
				...state,
				albums: [...state.albums, action.payload.album],
				status: action.payload.status,
			};

		default:
			return state;
	}
};
