import React, { useState } from 'react';

import SideBar from './SideBar';
import BackDrop from '../UIElement/BackDrop';
import NavLInks from './NavLInks';
import MainHeader from './MainHeader';
import SearchBox from '../searchBox/SearchBox';

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
					<SearchBox SearchMode={false} />
				</>
				<button className="main-nav-header-btn" onClick={openSideBar}>
					logo
				</button>
				<nav className="main-nav-header">
					<NavLInks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
