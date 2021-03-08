import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from './BackDrop';
import './modal.style.css';

const ModalLayout = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			{props.header}
			<div className={`modal__content ${props.contentClass}`}>
				{props.children}
			</div>
			<footer className={`modal__footer ${props.footerClass}`}>
				{props.footer}
			</footer>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal'));
};
const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <BackDrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal"
			>
				<ModalLayout {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};
export default Modal;
