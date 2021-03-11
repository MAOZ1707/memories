import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbums } from '../../action/albumAction';
import ErrorModal from '../UIElement/ErrorModal';
import LoadingSpinner from '../UIElement/LoadingSpinner';
import AlbumItem from './AlbumItem';
import './userAlbum.style.css';

const UserAlbums = () => {
	const auth = useSelector((state) => state.auth);
	const albumsState = useSelector((state) => state.albums);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();

	console.log(albumsState);

	useLayoutEffect(() => {
		dispatch(getUserAlbums(auth.userId));
	}, [auth.token, auth.userId, dispatch]);

	if (
		!albumsState.isLoading &&
		albumsState.albums &&
		albumsState.albums.length === 0
	) {
		return (
			<div className="no-albums">
				{albumsState.isLoading && <LoadingSpinner overlay />}
				No albums founds, do you want to create?
			</div>
		);
	}

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};
	return (
		<div className="album-container-layout">
			<ErrorModal error={error.error} onClear={clearError} />
			{albumsState.isLoading && (
				<div className="loading-indicator">
					<LoadingSpinner overlay />
				</div>
			)}
			{!albumsState.isLoading &&
				albumsState.albums &&
				albumsState.albums.map((album) => (
					<div key={album._id}>
						<AlbumItem info={album} />
					</div>
				))}
		</div>
	);
};

export default UserAlbums;
