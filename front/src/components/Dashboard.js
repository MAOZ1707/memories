import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import UserAlbums from './albums/UserAlbums';
import './dashboard.style.css';
import ImagesList from './images/ImagesList';
import UploadImage from './images/UpLoadImage';
import Cinema from './cinema/Cinema';
import Studio from './studio/Studio';

const Dashboard = () => {
	return (
		<React.Fragment>
			<div className="dashboard-container">
				<Router>
					<Switch>
						<Route path="/albums">
							<UserAlbums />
						</Route>
						<Route exact path="/album/:albumId/images">
							<ImagesList />
						</Route>
						<Route exact path="/album/:albumId/images/upload">
							<UploadImage />
						</Route>
						<Route exact path="/album/:albumId/images/cinema">
							<Cinema />
						</Route>
						<Route path="/image/:imageId/studio">
							<Studio />
						</Route>
						<Redirect to="/albums" />
					</Switch>
				</Router>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
