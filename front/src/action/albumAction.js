import axios from 'axios'

export const fetchSuccess = (type, data) => {
	return {
		type,
		payload: data,
	}
}

const loading = (type, data) => {
	return {
		type,
		payload: data,
	}
}

const errorHandler = (type, err) => {
	return {
		type,
		error: err,
	}
}
export const getUserAlbums = (userId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('ALBUMS_LOADING', true))
		try {
			const response = await axios({
				url: `/api/albums/user/${userId}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const data = await response.data.albums
			dispatch(fetchSuccess('GET_ALL_ALBUMS', data))
			dispatch(loading('ALBUMS_LOADING', false))
		} catch (error) {
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}
export const getAlbumById = (albumId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('ALBUMS_LOADING', true))
		try {
			const response = await axios({
				url: `/api/albums/${albumId}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const data = await response.data.album
			dispatch(fetchSuccess('GET_ALBUM', data))
			dispatch(loading('ALBUMS_LOADING', false))
		} catch (error) {
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}

export const deleteUserAlbum = (albumId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('ALBUMS_LOADING', true))

		try {
			await axios({
				url: `/api/albums/${albumId}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			dispatch({ type: 'DELETE_ALBUM', albumId })
			dispatch(loading('ALBUMS_LOADING', false))
		} catch (error) {
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}

export const likeAlbum = (albumId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('ALBUMS_LOADING', true))
		try {
			const response = await axios({
				url: `/api/albums/${albumId}/like-album`,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const { album } = await response.data
			dispatch({ type: 'LIKE_ALBUM', payload: album })
			dispatch(loading('ALBUMS_LOADING', false))
		} catch (error) {
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}

export const updateAlbumById = (albumId, update) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('ALBUMS_LOADING', true))
		try {
			const response = await axios({
				url: `/api/albums/${albumId}`,
				method: 'PATCH',
				data: {
					title: update.title,
					description: update.description,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})

			const data = await response.data.album
			dispatch({ type: 'UPDATE_ALBUM', payload: data })
			dispatch(loading('ALBUMS_LOADING', false))
		} catch (error) {
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}

export const createAlbum = (newAlbum) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('ALBUMS_LOADING', true))
		try {
			let formData = new FormData()
			formData.append('title', newAlbum.title)
			formData.append('description', newAlbum.description)
			formData.append('address', newAlbum.address)
			formData.append('image', newAlbum.image)
			formData.append('creator', auth.userId)

			const response = await axios({
				url: `/api/albums`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
				data: formData,
			})
			const { album } = await response.data
			const status = await response.status

			if (response.status === 200) {
				dispatch(loading('ALBUMS_LOADING', false))
				dispatch(fetchSuccess('CREATE_ALBUM', { album, status }))
				// dispatch(getUserAlbums(auth.userId));
			}
		} catch (error) {
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
			dispatch(loading('ALBUMS_LOADING', false))
		}
	}
}
