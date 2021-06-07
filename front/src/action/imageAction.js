import axios from 'axios'

const sendActions = (type, data) => {
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

export const likeImage = (imageId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('IMAGES_LOADING', true))
		try {
			const response = await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/${imageId}/like-image`,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const { image } = await response.data

			dispatch(loading('IMAGES_LOADING', false))
			dispatch(sendActions('LIKE_IMAGE', image))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}

export const getImagesByAlbumId = (albumId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('IMAGES_LOADING', true))
		try {
			const response = await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/album/${albumId}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const { images } = await response.data
			dispatch(loading('IMAGES_LOADING', false))
			dispatch(sendActions('GET_ALL_IMAGES', images))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}

export const deleteImageById = (imageId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('IMAGES_LOADING', true))
		try {
			await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/${imageId}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})

			dispatch(loading('IMAGES_LOADING', false))
			dispatch(sendActions('DELETE_IMAGE', imageId))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}

export const uploadImages = (albumId, images) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('IMAGES_LOADING', true))
		dispatch({ type: 'UPLOAD_STATUS', payload: 100 })
		try {
			const response = await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/album/${albumId}/upload`,
				method: 'post',
				data: images,
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			if (response.status === 200) {
				dispatch({ type: 'UPLOAD_STATUS', payload: response.status })
				dispatch(loading('IMAGES_LOADING', false))
			}

			const { data } = await response
			dispatch(sendActions('UPLOAD_IMAGES', data))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}

export const getImageById = (imageId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()

		dispatch(loading('IMAGES_LOADING', true))
		try {
			const response = await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/${imageId}`,
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
			})
			const selectedImage = await response.data.image
			dispatch(loading('IMAGES_LOADING', false))
			dispatch(sendActions('SELECTED_IMAGE', selectedImage))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}

export const addImageStyle = (filters, imageId) => {
	return async (dispatch, getState) => {
		const { auth } = getState()
		dispatch(loading('IMAGES_LOADING', true))
		try {
			const response = await axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/api/images/${imageId}/studio`,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
				data: filters,
			})
			const { image } = await response.data
			dispatch(loading('IMAGES_LOADING', false))
			dispatch(sendActions('ADD_IMAGE_FILTER', image))
		} catch (error) {
			dispatch(loading('IMAGES_LOADING', false))
			const err = error.response.data.message
			dispatch(errorHandler('ERROR', err))
		}
	}
}
