import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { uploadImages } from '../../action/imageAction';

const UpLoadImage = ({ albumId }) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	const dispatch = useDispatch();

	const sendFiles = () => {
		const formD = new FormData();
		acceptedFiles.forEach((file) => formD.append(`image`, file));
		dispatch(uploadImages(albumId, formD));
	};

	return (
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
			</aside>
			<button onClick={sendFiles}>dispatch</button>
		</section>
	);
};

export default UpLoadImage;
