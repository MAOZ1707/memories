import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addImageStyle, getImageById } from '../../action/imageAction';
import FiltersBarItem from './FiltersBarItem';
import Slider from './Slider';
import './studioFilter.css';

const DEFAULT_OPTIONS = [
	{
		name: 'Brightness',
		property: 'brightness',
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: '%',
	},
	{
		name: 'Contrast',
		property: 'contrast',
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: '%',
	},
	{
		name: 'Saturation',
		property: 'saturate',
		value: 100,
		range: {
			min: 0,
			max: 200,
		},
		unit: '%',
	},
	{
		name: 'Grayscale',
		property: 'grayscale',
		value: 0,
		range: {
			min: 0,
			max: 100,
		},
		unit: '%',
	},
	{
		name: 'Sepia',
		property: 'sepia',
		value: 0,
		range: {
			min: 0,
			max: 100,
		},
		unit: '%',
	},
	{
		name: 'Hue Rotate',
		property: 'hue-rotate',
		value: 0,
		range: {
			min: 0,
			max: 360,
		},
		unit: 'deg',
	},
	{
		name: 'Blur',
		property: 'blur',
		value: 0,
		range: {
			min: 0,
			max: 20,
		},
		unit: 'px',
	},
];

const Studio = () => {
	const { imageId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const image = useSelector((state) => state.images.image);
	const album = useSelector((state) => state.albums.album);

	const [options, setOptions] = useState(DEFAULT_OPTIONS);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
	const selectedOption = options[selectedOptionIndex];

	const handleSliderChange = (e) => {
		setOptions((prevState) => {
			return prevState.map((option, i) => {
				if (i !== selectedOptionIndex) return option;
				return { ...option, value: e.target.value };
			});
		});
	};

	useEffect(() => {
		dispatch(getImageById(imageId));
	}, [imageId]);

	const getImageStyle = () => {
		const filters = options.map((option) => {
			return `${option.property}(${option.value}${option.unit})`;
		});

		return { filter: filters.join(' ') };
	};

	const saveFilters = () => {
		const filter = getImageStyle();
		dispatch(addImageStyle(filter, imageId));
		history.push(`/album/${album._id}/images`);
	};

	return (
		<div className="studio-container">
			<div className="studio-main-image">
				{image && (
					<img
						style={getImageStyle()}
						src={image.imageUrl}
						alt="img-selected"
						className="process-image"
					/>
				)}
			</div>
			<div className="studio-filters-wrapper">
				<Slider
					min={selectedOption.range.min}
					max={selectedOption.range.max}
					value={selectedOption.value}
					handleChange={handleSliderChange}
				/>
				<div className="filter-bar-container">
					{options.map((option, i) => (
						<FiltersBarItem
							key={i}
							name={option.name}
							active={i === selectedOptionIndex}
							handleClick={() => setSelectedOptionIndex(i)}
						/>
					))}
					<div className="save-button-wrapper">
						<button className="save-filter" onClick={saveFilters}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Studio;
