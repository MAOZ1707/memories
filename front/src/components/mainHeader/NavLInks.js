import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { logOut } from '../../action/userAction';
import ReactToolTip from 'react-tooltip';
// import UserLoginIcon from './UserLoginIcon';

import './navLinks.style.css';

const NavLInks = () => {
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const logOutUser = () => {
		dispatch(logOut());
	};

	return (
		<ul className="nav-link-wrapper">
			{/* <UserLoginIcon /> */}
			{auth.isLogin && (
				<li>
					<NavLink to="/albums">Albums</NavLink>
				</li>
			)}
			{auth.isLogin && (
				<li>
					<NavLink to={`/user/create-album`}>Create Album</NavLink>
				</li>
			)}
			<ReactToolTip id="logTip" effect="solid" type="dark" place="top" offset={{ bottom: 40, right: 50 }} arrowColor="#fff0">
				Log Out
			</ReactToolTip>
			{auth.isLogin && (
				<button className="log-out-btn" to="/" onClick={logOutUser}>
					<img className="log-out-icon" alt="logout" data-tip data-for="logTip" src="https://img.icons8.com/ios/50/000000/exit.png" />
				</button>
			)}
		</ul>
	);
};

export default NavLInks;
