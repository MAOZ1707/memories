import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SideBar from './SideBar';
import BackDrop from '../UIElement/BackDrop';
import NavLInks from './NavLInks';
import MainHeader from './MainHeader';
import AppLogo from './AppLogo';

import './mainNavigation.style.css';

const MainNavigation = () => {
	const [sideBarOpen, setSideBarOpen] = useState(false);

	const closeSideBar = () => {
		setSideBarOpen(false);
	};
	const openSideBar = () => {
		setSideBarOpen(true);
	};

	return (
		<React.Fragment>
			{sideBarOpen && <BackDrop onClick={closeSideBar} />}
			<SideBar onClick={closeSideBar} show={sideBarOpen}>
				<NavLInks />
			</SideBar>
			<MainHeader>
				<>
					<div className="header">
						<div className="app-title">
							<Link to={'/albums'}>Memories</Link>
						</div>
					</div>
				</>
				<AppLogo handleClick={openSideBar} />
				<nav className="main-nav-header">
					<NavLInks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
