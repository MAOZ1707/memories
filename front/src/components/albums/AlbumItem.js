import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeAlbum } from '../../action/albumAction';
import Card from '../UIElement/Card';
import ErrorModal from '../UIElement/ErrorModal';
import LoadingSpinner from '../UIElement/LoadingSpinner';
import Map from '../UIElement/Map';
import './albumItem.style.css';
import DeleteAlbum from './DeleteAlbum';
import EditAlbum from './EditAlbum';

const AlbumItem = ({ info }) => {
	const [locationIsOpen, setLocationIsOpen] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const albumsState = useSelector((state) => state.albums);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();

	const likeButton = () => {
		dispatch(likeAlbum(info._id));
	};
	const openLocation = () => {
		setLocationIsOpen((prevState) => !prevState);
	};

	const handleCancelDelete = (cancel) => {
		setDeleteMode(cancel);
	};
	const handleCancelEdit = (cancel) => {
		setEditMode(cancel);
	};

	const clearError = () => {
		dispatch({ type: 'CLEAR_ERROR' });
	};

	return (
		<Card className="album-card-container">
			<ErrorModal error={error.error} onClear={clearError} />
			{albumsState.isLoading && <LoadingSpinner />}
			<div className="control-panel">
				<p className="creation-date">{info.createAt}</p>
				<div className="control-panel-btn">
					<button
						className="delete-btn-icon"
						onClick={() => setDeleteMode(true)}
					>
						<img
							src="https://img.icons8.com/material-two-tone/48/000000/delete-sign.png"
							alt="delete"
						/>
					</button>
					<button className="edit-btn-icon" onClick={() => setEditMode(true)}>
						<img
							src="https://img.icons8.com/ios/50/000000/edit--v1.png"
							alt="edit"
						/>
					</button>
				</div>
			</div>
			{deleteMode && (
				<DeleteAlbum
					albumId={info._id}
					handleCancelDelete={handleCancelDelete}
				/>
			)}
			{editMode && (
				<EditAlbum
					albumId={info._id}
					description={info.description}
					title={info.title}
					handleCloseEdit={handleCancelEdit}
				/>
			)}
			<div className="album-main">
				<div className="image-container">
					<img src={info.image} alt="album-example" className="main-image" />

					<div className="card-info-text">
						<p className="card-album-description">{info.description}</p>
						<button className="link image-btn" type="button">
							<Link to={`/album/${info._id}/images`}>Images</Link>
						</button>
					</div>
				</div>

				<div className={`map-container ${locationIsOpen && 'active'}`}>
					<Map
						lat={info.location.lat}
						lng={info.location.lng}
						address={info.address}
					/>
				</div>
			</div>
			<div className="action-panel">
				<button className="location-btn" onClick={openLocation}>
					{!locationIsOpen ? (
						<img
							className="location-img"
							src="https://img.icons8.com/ios/64/000000/marker.png"
							alt="location"
						/>
					) : (
						<img
							className="location-img"
							src="https://img.icons8.com/color/48/4a90e2/previous--location.png"
							alt="location-img"
						/>
					)}
				</button>
				<button className="like-btn" onClick={likeButton}>
					{!info.like ? (
						<img
							className="like-img"
							src="https://img.icons8.com/ios/50/000000/like--v1.png"
							alt="like"
						/>
					) : (
						<img
							className="like-img"
							src="https://img.icons8.com/ios-filled/50/fa314a/like--v1.png"
							alt="fill-like"
						/>
					)}
				</button>
			</div>
			<div className="album-information">
				<p className="info-sub-title">Album name</p>
				<div className="card-album-title">{info.title}</div>
			</div>
		</Card>
	);
};

export default AlbumItem;
