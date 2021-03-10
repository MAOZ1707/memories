import React, { useRef } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './createAlbum.style.css';
import Thumb from './Thumb';
import { createAlbum } from '../../action/albumAction';
import LoadingSpinner from '../UIElement/LoadingSpinner';

const CreateAlbum = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const albumsState = useSelector((state) => state.albums);

	console.log(albumsState);

	const fileInputRef = useRef();

	const init = {
		title: '',
		description: '',
		address: '',
		image: null,
	};

	return (
		<div className="auth-container">
			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					title: Yup.string()
						.max(20, 'Must be 20 characters or less')
						.required('Required'),
					description: Yup.string()
						.max(25, 'Must be 25 characters or less')
						.required('Required'),
					address: Yup.string().required('Required'),
					image: Yup.string().required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(createAlbum(values));
					setSubmitting(false);
					history.push('/');
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						{albumsState.isLoading && <LoadingSpinner />}
						<span className="err-msg">
							<ErrorMessage name="title" />
						</span>
						<div className="form-controller">
							<Field
								type="text"
								id="title"
								name="title"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="title" className="form-label">
								Album name
							</label>
						</div>

						<span className="err-msg">
							<ErrorMessage name="description" />
						</span>
						<div className="form-controller">
							<Field
								type="description"
								id="description"
								name="description"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="description" className="form-label">
								Description
							</label>
						</div>

						<span className="err-msg">
							<ErrorMessage name="address" />
						</span>
						<div className="form-controller">
							<Field
								type="text"
								id="address"
								name="address"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="address" className="form-label">
								Address
							</label>
						</div>

						<span className="err-msg">
							<ErrorMessage name="image" />
						</span>
						<div className="form-file-controller">
							<input
								type="file"
								id="image"
								name="image"
								accept=".jpg,.png,jpeg"
								className="form-input-file"
								ref={fileInputRef}
								onChange={(event) =>
									formik.setFieldValue('image', event.target.files[0])
								}
							/>
							<Thumb image={formik.values.image} />

							<button
								className="peak-image-btn"
								type="button"
								onClick={(e) => {
									e.preventDefault();
									fileInputRef.current.click();
								}}
							>
								<img
									className="peak-image-icon"
									src="https://img.icons8.com/ios/50/000000/image.png"
									alt="upload-file"
								/>
								Peak image
							</button>
						</div>

						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateAlbum;
