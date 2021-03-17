import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbums } from '../../action/albumAction';
import LoadingSpinner from '../UIElement/LoadingSpinner';
import AlbumItem from './AlbumItem';
import FilterBar from '../filterBar/FilterBar';
import './userAlbum.style.css';

const UserAlbums = () => {
	const auth = useSelector((state) => state.auth);
	const albumsState = useSelector((state) => state.albums);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(getUserAlbums(auth.userId));
	}, [auth.userId]);

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

	return (
		<React.Fragment>
			<FilterBar />
			<div className="album-container-layout">
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
		</React.Fragment>
	);
};

export default UserAlbums;
