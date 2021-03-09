/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAlbumById } from '../../action/albumAction';
import { getImagesByAlbumId, uploadMulti } from '../../action/imageAction.js';
import ErrorModal from '../UIElement/ErrorModal';
import ImageItem from './ImageItem';
import UploadImage from './UpLoadImage';
import './images.style.css';

const ImagesList = () => {
	const dispatch = useDispatch();
	const imageState = useSelector((state) => state.images);
	const error = useSelector((state) => state.error);
	const { albumId } = useParams();

	useEffect(() => {
		dispatch(getImagesByAlbumId(albumId));
		dispatch(getAlbumById(albumId));
	}, [albumId, dispatch]);

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};

	return (
		<div className="images-list-container">
			<ErrorModal error={error.error} onClear={clearError} />
			{/* <UploadImage albumId={albumId} /> */}
			{imageState.images.length === 0 ? (
				<div>
					No images, please upload.
					<button>
						<Link to={`/album/${albumId}/images/upload`}>Upload</Link>
					</button>
				</div>
			) : (
				<React.Fragment>
					{imageState.images.length > 0 &&
						imageState.images.map((image) => (
							<React.Fragment key={image._id}>
								<ImageItem
									key={image._id}
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
	);
};

export default ImagesList;
