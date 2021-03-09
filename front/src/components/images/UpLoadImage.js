import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { uploadImages } from '../../action/imageAction';
import { useParams } from 'react-router-dom';

import './uploadImage.style.css';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	flexWrap: 'wrap',
	background: '#fff',
	border: '1px solid #babdbd',
	margin: 0,
	outline: 'none',
	width: '100%',
	minHeight: '200px',
	padding: '10px',
	height: 'auto',
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	gap: 8,
	width: 150,
	height: 150,
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
};

const img = {
	display: 'block',
	width: '100%',
	objectFit: 'cover',
	// height: '100%',
};

const UpLoadImage = () => {
	const [previewImages, setPreviewImages] = useState([]);

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setPreviewImages(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});
	const dispatch = useDispatch();

	const { albumId } = useParams();
	console.log(albumId);

	const sendFiles = () => {
		const formD = new FormData();
		acceptedFiles.forEach((file) => formD.append(`image`, file));
		dispatch(uploadImages(albumId, formD));
	};

	useEffect(
		() => () => {
			previewImages.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[previewImages]
	);

	const thumbs = previewImages.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} alt="prev" style={img} />
			</div>
		</div>
	));
	const baseStyle = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#eeeeee',
		borderStyle: 'solid',
		backgroundColor: '#fafafa',
		color: '#babdbd',
		outline: 'none',
		marginTop: 20,
		textAlign: 'center',
		transition: 'border .24s ease-in-out',
	};
	const activeStyle = {
		borderColor: '#2196f3',
	};

	const acceptStyle = {
		borderColor: '#00e676',
	};

	const rejectStyle = {
		borderColor: '#ff1744',
	};

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	return (
		<section className="container">
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p className="drop-zone">
					Drag 'n' drop some files here, or click to select files
				</p>
			</div>
			<h4>Preview</h4>
			<aside style={thumbsContainer}>{thumbs}</aside>
			<button onClick={sendFiles}>dispatch</button>
		</section>
	);
};

export default UpLoadImage;