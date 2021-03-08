/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import { deleteImageById, likeImage } from '../../action/imageAction';
import ImageLoader from '../UIElement/ImageLoader';

import ErrorModal from '../UIElement/ErrorModal';

const tooltipProps = {
	place: 'bottom',
	type: 'info',
	effect: 'solid',
	className: 'image-tooltip',
	delayShow: 100,
	backgroundColor: 'black',
	textColor: 'white',
};

const ImageItem = ({ imgUrl, id, like, filters }) => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);

	const [isLike, setIsLike] = useState(like);
	const [loadedImage, setLoadedImage] = useState(true);

	const imageLikeBtn = () => {
		dispatch(likeImage(id));
		setIsLike((prevState) => !prevState);
	};

	const deleteImage = () => {
		dispatch(deleteImageById(id));
	};

	const onLoadImage = () => {
		setLoadedImage(false);
	};

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};

	return (
		<div className="image-wrapper">
			<ErrorModal error={error.error} onClear={clearError} />
			<img
				className="image"
				src={imgUrl}
				alt={id}
				style={filters}
				onLoad={onLoadImage}
			/>
			{loadedImage && <ImageLoader />}
			<div className="image-action">
				<button className="edit-img-btn" data-tip data-for="editInfo">
					<Link to={`/image/${id}/studio`}>
						<img
							src="https://img.icons8.com/ios/50/000000/edit-image.png"
							alt="editInfo"
						/>
					</Link>
					<ReactToolTip id="editInfo" {...tooltipProps}>
						Filters
					</ReactToolTip>
				</button>

				<button className="like-btn" onClick={imageLikeBtn}>
					{!isLike ? (
						<img
							className="like-img"
							src="https://img.icons8.com/ios/50/000000/like--v1.png"
							alt="like"
						/>
					) : (
						<img
							className="like-img"
							src="https://img.icons8.com/ios-filled/50/fa314a/like--v1.png"
							alt="fill-like"
						/>
					)}
				</button>

				<button className="delete-img-btn" onClick={deleteImage}>
					<img
						src="https://img.icons8.com/material-two-tone/48/000000/delete-sign.png"
						alt="edit-img"
					/>
				</button>
			</div>
		</div>
	);
};

export default ImageItem;
