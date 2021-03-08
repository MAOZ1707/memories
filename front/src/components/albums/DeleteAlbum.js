/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAlbum } from '../../action/albumAction';
import ErrorModal from '../UIElement/ErrorModal';

import './deleteAlbum.style.css';

const DeleteAlbum = ({ albumId, handleCancelDelete }) => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);

	const handleCancel = () => {
		handleCancelDelete(false);
	};

	const confirmDelete = () => {
		dispatch(deleteUserAlbum(albumId));
	};
	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};
	return (
		<div className="delete-album-container">
			<ErrorModal error={error.error} onClear={clearError} />
			<h3 className="delete-confirm-message">
				Do you sure you want to delete this album?
			</h3>
			<div className="delete-album-buttons">
				<button className="confirm-delete-btn" onClick={confirmDelete}>
					Confirm
				</button>
				<button className="cancel-delete-btn" onClick={handleCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteAlbum;
