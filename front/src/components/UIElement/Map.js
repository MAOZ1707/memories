import React, { useEffect, useState } from 'react'

import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const Map = ({ lng = 0, lat = 0, address }) => {
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '100%',
		latitude: 0,
		longitude: 0,
		zoom: 12,
	})

	useEffect(() => {
		setViewport({
			...viewport,
			latitude: lat,
			longitude: lng,
		})
	}, [])

	return (
		<ReactMapGL
			{...viewport}
			mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
			<Popup
				latitude={viewport.latitude}
				longitude={viewport.longitude}
				anchor='bottom'
				tipSize={10}
				closeButton={false}
				offsetTop={-10}
				offsetLeft={10}
				className='map-tooltip'>
				<div className='address-on-map'>{address}</div>
			</Popup>
			<Marker latitude={viewport.latitude} longitude={viewport.longitude}>
				<img
					className='gps-marker'
					src='https://img.icons8.com/color/48/000000/marker--v2.png'
					alt='marker'
				/>
			</Marker>
		</ReactMapGL>
	)
}
export default Map
