import { combineReducers } from 'redux';
import { albumsReducers } from './albumsReducers';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { imagesReducer } from './imagesReducers';
const rootReducers = combineReducers({
	auth: authReducer,
	albums: albumsReducers,
	images: imagesReducer,
	error: errorReducer,
});

export default rootReducers;
