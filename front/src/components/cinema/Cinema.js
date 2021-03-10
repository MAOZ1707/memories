import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getImagesByAlbumId } from '../../action/imageAction';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import './cinema.style.css';

const Cinema = () => {
	const { albumId } = useParams();
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images.images);
	const [imageGallery, setImageGallery] = useState([]);

	console.log(images);

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

	return images && <ImageGallery items={imageGallery} lazyLoad={true} />;
};

export default Cinema;
