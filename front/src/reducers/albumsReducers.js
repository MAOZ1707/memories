const initialState = {
	albums: [],
	album: {},
	isLoading: false,
};

export const albumsReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_ALBUMS':
			return {
				...state,
				albums: action.payload,
			};
		case 'GET_ALBUM':
			return {
				...state,
				album: action.payload,
			};
		case 'ALBUMS_LOADING':
			console.log(action);
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
				albums: state.albums.map((album) =>
					album._id === action.payload._id ? action.payload : album
				),
			};
		case 'UPDATE_ALBUM':
			return {
				...state,
				albums: state.albums.map((album) =>
					album._id === action.payload._id ? action.payload : album
				),
			};
		case 'CREATE_ALBUM':
			console.log(action);

			return {
				...state,
				albums: [...state.albums, action.payload],
			};

		default:
			return state;
	}
};
