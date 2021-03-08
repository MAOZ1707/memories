import React, { useEffect, useState } from 'react';

import './thumb.style.css';

const Thumb = ({ image }) => {
	const [previewImage, setPreviewImage] = useState();

	useEffect(() => {
		if (!image) return;

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewImage(fileReader.result);
		};
		fileReader.readAsDataURL(image);
	}, [image]);

	return (
		<div className="image-preview-container">
			{previewImage && <img src={previewImage} alt="file" />}
		</div>
	);
};

export default Thumb;
