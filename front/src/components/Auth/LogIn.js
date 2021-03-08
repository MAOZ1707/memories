/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMsg from '../UIElement/ErrorMsg';
import LoadingSpinner from '../UIElement/LoadingSpinner';
import Button from '../UIElement/Button';

import './auth.style.css';
import { Link } from 'react-router-dom';

const LogIn = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const error = useSelector((state) => state.error);

	const init = {
		email: '',
		password: '',
	};

	return (
		<div className="auth-container">
			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					email: Yup.string()
						.email('Invalid email address')
						.required('Required'),
					password: Yup.string()
						.min(6, 'Must be 6 characters or more')
						.required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(logIn(values));
					setSubmitting(false);
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<ErrorMsg />
						{auth.isLoading && !error.error && <LoadingSpinner />}

						<span className="err-msg">
							<ErrorMessage name="email" />
						</span>
						<div className="form-controller">
							<Field
								type="email"
								id="email"
								name="email"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="email" className="form-label">
								Email
							</label>
						</div>

						<span className="err-msg">
							<ErrorMessage name="password" />
						</span>
						<div className="form-controller">
							<Field
								type="password"
								id="password"
								name="password"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="password" className="form-label">
								Password
							</label>
						</div>

						<Button type="submit" submit>
							Submit
						</Button>
						<div className="form-footer">
							<span>
								Need to create account?
								<Link to="/signup">
									<button type="button" className="link-btn">
										Sign up
									</button>
								</Link>
							</span>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LogIn;
