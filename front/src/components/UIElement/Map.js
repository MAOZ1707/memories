import React, { useEffect, useState } from 'react';

import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const Map = ({ lng = 0, lat = 0, address }) => {
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '100%',
		latitude: 0,
		longitude: 0,
		zoom: 12,
	});

	useEffect(() => {
		setViewport({
			...viewport,
			latitude: lat,
			longitude: lng,
		});
	}, []);

	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/maoz17/ckl7tioo26lxf17tfatzufp7m"
			mapboxApiAccessToken="pk.eyJ1IjoibWFvejE3IiwiYSI6ImNra3M2NzRybjA3bHIzMWxtcjFubjVoMm0ifQ.K-lwz91cyv_pkq1saF5-Yw"
			// onViewportChange={(nextViewport) => setViewport(nextViewport)}
		>
			<Popup
				latitude={viewport.latitude}
				longitude={viewport.longitude}
				anchor="bottom"
				tipSize={10}
				closeButton={false}
				offsetTop={-10}
				offsetLeft={10}
				className="map-tooltip"
			>
				<div className="address-on-map">{address}</div>
			</Popup>
			<Marker latitude={viewport.latitude} longitude={viewport.longitude}>
				<img
					className="gps-marker"
					src="https://img.icons8.com/color/48/000000/marker--v2.png"
					alt="marker"
				/>
			</Marker>
		</ReactMapGL>
	);
};
export default Map;
