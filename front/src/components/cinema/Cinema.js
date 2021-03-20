import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getImagesByAlbumId } from '../../action/imageAction';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import './cinema.style.css';
import Button from '../UIElement/Button';

const Cinema = () => {
	const { albumId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images.images);
	const [imageGallery, setImageGallery] = useState([]);

	useEffect(() => {
		dispatch(getImagesByAlbumId(albumId));
		if (images) {
			setImageGallery(
				images.map((img) => {
					return {
						original: img.imageUrl,
						thumbnail: img.imageUrl,
					};
				})
			);
		}
	}, [albumId]);

	return (
		<React.Fragment>
			{images && <ImageGallery items={imageGallery} lazyLoad={true} />}
			<Button back onClick={() => history.goBack()}>
				Go back
			</Button>
		</React.Fragment>
	);
};

export default Cinema;
