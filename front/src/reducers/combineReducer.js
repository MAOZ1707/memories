import { combineReducers } from 'redux'
import { albumsReducers } from './albumsReducers'
import { authReducer } from './authReducer'
import { errorReducer } from './errorReducer'
import { imagesReducer } from './imagesReducers'
import { searchReducer } from './searchReducer.js'

const appReducer = combineReducers({
	auth: authReducer,
	albums: albumsReducers,
	images: imagesReducer,
	error: errorReducer,
	search: searchReducer,
})

// Reset the state after LOG_OUT
const rootReducers = (state, action) => {
	if (action.type === 'USER_LOGGED_OUT') {
		state = undefined
	}

	return appReducer(state, action)
}
export default rootReducers
