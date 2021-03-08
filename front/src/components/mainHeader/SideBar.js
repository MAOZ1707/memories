/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import './sideBar.style.css';

const SideBar = (props) => {
	const nodeRef = useRef();

	const content = (
		<CSSTransition
			nodeRef={nodeRef}
			classNames="side-bar-animation"
			in={props.show}
			timeout={200}
			mountOnEnter
			unmountOnExit
		>
			<aside
				className="main-nav-side-ber"
				onClick={props.onClick}
				ref={nodeRef}
			>
				{props.children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(content, document.getElementById('side-bar'));
};

export default SideBar;
