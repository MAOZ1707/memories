import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAlbums } from '../../action/albumAction'
import AlbumItem from './AlbumItem'
import FilterBar from '../filterBar/FilterBar'
import LoadingSpinner from '../UIElement/LoadingSpinner'
import Button from '../UIElement/Button'
import './userAlbum.style.css'
import { Link } from 'react-router-dom'

const UserAlbums = () => {
	const auth = useSelector((state) => state.auth)
	const albumsState = useSelector((state) => state.albums)
	const { searchTerm } = useSelector((state) => state.search)
	const dispatch = useDispatch()

	let searchAlbum =
		albumsState.albums &&
		albumsState.albums.filter((album) =>
			album.title.toLowerCase().includes(searchTerm.toLowerCase())
		)

	useEffect(() => {
		dispatch(getUserAlbums(auth.userId))
	}, [auth.userId, dispatch, auth.token])

	if (
		!albumsState.isLoading &&
		albumsState.albums &&
		albumsState.albums.length === 0
	) {
		return (
			<div className='no-albums'>
				{albumsState.isLoading && <LoadingSpinner overlay />}
				<p className='no-album-message'>
					No albums founds, do you want to create?
				</p>
				<Button submit>
					<Link to='/user/create-album'>Create album</Link>
				</Button>
			</div>
		)
	}

	return (
		<React.Fragment>
			<FilterBar />
			<div className='album-container-layout'>
				{albumsState.isLoading && (
					<div className='loading-indicator'>
						<LoadingSpinner overlay />
					</div>
				)}
				{!albumsState.isLoading &&
					albumsState.albums &&
					searchAlbum.map((album) => (
						<div key={album._id}>
							<AlbumItem info={album} />
						</div>
					))}
			</div>
		</React.Fragment>
	)
}

export default UserAlbums
