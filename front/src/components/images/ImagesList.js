/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getAlbumById } from '../../action/albumAction'
import { getImagesByAlbumId } from '../../action/imageAction.js'
import ImageItem from './ImageItem'
import ActionBar from '../actionsBar/ActionBar'
import ErrorModal from '../UIElement/ErrorModal'
import Button from '../UIElement/Button'

import './images.style.css'

import LoadingSpinner from '../UIElement/LoadingSpinner'

const ImagesList = () => {
	const dispatch = useDispatch()
	const imageState = useSelector((state) => state.images)
	const error = useSelector((state) => state.error)
	const { albumId } = useParams()
	const history = useHistory()

	useEffect(() => {
		dispatch(getImagesByAlbumId(albumId))
		dispatch(getAlbumById(albumId))
	}, [albumId, dispatch])

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' })
	}

	return (
		<div className='images-list-container'>
			{imageState.isLoading && <LoadingSpinner overlay />}
			<ErrorModal error={error.error} onClear={clearError} />
			{imageState.images.length === 0 ? (
				<div className='no-image-container'>
					<p>No images, please upload.</p>
					<Button submit>
						<Link to={`/album/${albumId}/images/upload`}>Upload</Link>
					</Button>
					<Button back onClick={() => history.goBack()}>
						Go back
					</Button>
				</div>
			) : (
				<React.Fragment>
					{imageState.images.length > 0 && <ActionBar albumId={albumId} />}
					{imageState.images.length > 0 &&
						imageState.images.map((image) => (
							<React.Fragment key={image.imageUrl}>
								<ImageItem
									key={image.imageUrl}
									imgUrl={image.imageUrl}
									id={image._id}
									like={image.like}
									filters={image.filters}
								/>
							</React.Fragment>
						))}
				</React.Fragment>
			)}
		</div>
	)
}

export default ImagesList
