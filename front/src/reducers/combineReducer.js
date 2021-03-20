import { combineReducers } from 'redux';
import { albumsReducers } from './albumsReducers';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { imagesReducer } from './imagesReducers';

const appReducer = combineReducers({
	auth: authReducer,
	albums: albumsReducers,
	images: imagesReducer,
	error: errorReducer,
});

const rootReducers = (state, action) => {
	if (action.type === 'USER_LOGGED_OUT') {
		console.log('rootReducer, true');
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducers;
