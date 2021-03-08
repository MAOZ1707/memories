/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './auth.style.css';

import { signUp } from '../../action/userAction';
import LoadingSpinner from '../UIElement/LoadingSpinner';
import ErrorMsg from '../UIElement/ErrorMsg';
import Button from '../UIElement/Button';

const SignUp = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const error = useSelector((state) => state.error);

	const init = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	};

	return (
		<div className="auth-container">
			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					firstname: Yup.string()
						.max(10, 'Must be 10 characters or less')
						.required('Required'),
					lastname: Yup.string()
						.max(10, 'Must be 10 characters or less')
						.required('Required'),
					email: Yup.string()
						.email('Invalid email address')
						.required('Required'),
					password: Yup.string()
						.min(6, 'Must be 6 characters or more')
						.required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(signUp(values));
					setSubmitting(false);
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<ErrorMsg />
						{auth.isLoading && !error.error && <LoadingSpinner />}

						<span className="err-msg">
							<ErrorMessage name="firstname" />
						</span>
						<div className="form-controller">
							<Field
								type="firstname"
								id="firstname"
								name="firstname"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="firstname" className="form-label">
								First name
							</label>
						</div>

						<span className="err-msg">
							<ErrorMessage name="lastname" />
						</span>
						<div className="form-controller">
							<Field
								type="lastname"
								id="lastname"
								name="lastname"
								className="form-input"
								autoComplete="off"
								required
							/>
							<label htmlFor="lastname" className="form-label">
								Last name
							</label>
						</div>

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
								Do you have account?
								<Link to="/login">
									<button type="button" className="link-btn">
										Log in
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

export default SignUp;
