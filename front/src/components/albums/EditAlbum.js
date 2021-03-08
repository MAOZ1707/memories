import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlbumById } from '../../action/albumAction';

import './editAlbum.style.css';
import ErrorModal from '../UIElement/ErrorModal';

const EditAlbum = ({ description, title, handleCloseEdit, albumId }) => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);

	const formik = useFormik({
		initialValues: {
			description: description,
			title: title,
		},
		validationSchema: Yup.object({
			description: Yup.string()
				.min(3, 'Must be at least 3 characters or more')
				.required(),
			title: Yup.string()
				.min(3, 'Must be at least 3 characters or more')
				.required(),
		}),
		onSubmit: (values) => {
			dispatch(updateAlbumById(albumId, values));
			closeEdit();
		},
	});

	const closeEdit = () => {
		handleCloseEdit(false);
	};

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};
	return (
		<div className="edit-album-container">
			<ErrorModal error={error.error} onClear={clearError} />
			<h4 className="update-album-title">Update album</h4>
			<form onSubmit={formik.handleSubmit} className="update-album-form">
				<label htmlFor="title" className="update-album-label">
					Album name
				</label>

				<>
					{formik.touched.title && formik.errors.title ? (
						<div className="update-error-message">{formik.errors.title}</div>
					) : null}
				</>

				<input
					className="update-album-form"
					type="text"
					id="title"
					name="title"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.title}
				/>

				<label htmlFor="description" className="update-album-label">
					Album description
				</label>

				<>
					{formik.touched.description && formik.errors.description ? (
						<div className="update-error-message">
							{formik.errors.description}
						</div>
					) : null}
				</>

				<textarea
					className="update-album-form textarea"
					type="text"
					id="description"
					name="description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
				/>

				<div className="edit-album-buttons">
					<button className="confirm-edit-btn" type="submit">
						Confirm
					</button>
					<button type="button" className="cancel-edit-btn" onClick={closeEdit}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditAlbum;
