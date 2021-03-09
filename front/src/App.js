import Dashboard from './components/Dashboard';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/LogIn';
import MainNavigation from './components/mainHeader/MainNavigation';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authCheck } from './action/userAction';
import { useEffect } from 'react';
import CreateAlbum from './components/albums/CreateAlbum';
import UserAlbums from './components/albums/UserAlbums';
import ImagesList from './components/images/ImagesList';
import UpLoadImage from './components/images/UpLoadImage';
import Studio from './components/studio/Studio';

function App() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authCheck());
	}, []);

	let routes;
	if (auth.token) {
		routes = (
			<Switch>
				<Route exact path="/">
					<Dashboard />
				</Route>
				<Route exact path="/albums">
					<UserAlbums />
				</Route>
				<Route exact path="/album/:albumId/images">
					<ImagesList />
				</Route>
				<Route exact path="/album/:albumId/images/upload">
					<UpLoadImage />
				</Route>
				<Route path="/image/:imageId/studio">
					<Studio />
				</Route>
				<Route path={`/user/create-album`}>
					<CreateAlbum />
				</Route>
				<Redirect exact to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/signup">
					<SignUp />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Redirect to="/signup" />
			</Switch>
		);
	}

	return (
		<Router>
			<MainNavigation />
			<>{routes}</>
		</Router>
	);
}

export default App;