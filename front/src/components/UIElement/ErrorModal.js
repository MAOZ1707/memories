import React from 'react';

import Button from '../UIElement/Button';
import Modal from './Modal';

const ErrorModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header="An Error Occurred!"
			show={!!props.error}
			footer={
				<Button submit onClick={props.onClear}>
					Close
				</Button>
			}
		>
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
