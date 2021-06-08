/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react'
import SearchBox from '../searchBox/SearchBox'
import { getUserAlbums } from '../../action/albumAction'
import { useDispatch, useSelector } from 'react-redux'

import './filterBar.style.css'
const FilterBar = () => {
	const [likeMode, setLikeMode] = useState(false)
	const dispatch = useDispatch()
	const { userId } = useSelector((state) => state.auth)

	const handleLike = () => {
		setLikeMode((prevState) => !prevState)
	}

	const dispatchAction = useCallback((arg) => {
		dispatch({ type: 'SEARCH_LIKE', payload: arg })
	}, [])

	useEffect(() => {
		if (likeMode) {
			dispatchAction(true)
		} else {
			dispatchAction(null)
		}
	}, [dispatchAction, likeMode, userId])

	return (
		<div className='filter-bar-action-container'>
			<SearchBox />
			<div onClick={handleLike}>
				{likeMode ? (
					<img
						src='https://img.icons8.com/ios-filled/50/fa314a/filled-like.png'
						alt='like-fill'
					/>
				) : (
					<img
						src='https://img.icons8.com/ios/50/000000/like.png'
						alt='like-filter'
					/>
				)}
			</div>
		</div>
	)
}

export default FilterBar
