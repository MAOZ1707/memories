import React, { useState } from 'react';

import SideBar from './SideBar';
import BackDrop from '../UIElement/BackDrop';
import NavLInks from './NavLInks';
import MainHeader from './MainHeader';
import SearchBox from '../searchBox/SearchBox';

import './mainNavigation.style.css';
import AppLogo from './AppLogo';

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
				<AppLogo handleClick={openSideBar} />
				<nav className="main-nav-header">
					<NavLInks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
