const initialState = {
	image: {},
	images: [],
	isLoading: false,
	uploadStatus: 0,
};

export const imagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_IMAGES':
			return {
				...state,
				images: action.payload,
			};
		case 'SELECTED_IMAGE':
			return {
				...state,
				image: action.payload,
			};
		case 'DELETE_IMAGE':
			return {
				...state,
				images: state.images.filter((image) => image._id !== action.payload),
			};
		case 'LIKE_IMAGE':
			return {
				...state,
				images: state.images.map((image) =>
					image._id === action.payload._id ? action.payload : image
				),
			};
		case 'UPLOAD_IMAGES':
			return {
				...state,
				images: [...state.images, action.payload],
			};
		case 'IMAGES_LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'UPLOAD_STATUS':
			return {
				...state,
				uploadStatus: action.payload,
			};
		case 'ADD_IMAGE_FILTER':
			return {
				...state,
				image: action.payload,
			};
		default:
			return state;
	}
};
